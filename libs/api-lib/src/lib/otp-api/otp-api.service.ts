import { Inject, Injectable } from '@nestjs/common';
import { MlClientApi } from '@ml-workspace/auth-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  createSignature,
  getCurrentDateTime,
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  OTPOperation,
  OTPService,
} from '@ml-workspace/common';
import { OTP } from '../../route';

@Injectable()
export class OtpApiService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly mlClientApi: MlClientApi
  ) {}

  async getOtp(dto: InAppOtpDtoGetDetails, service: OTPService): Promise<any> {
    const { baseUrl, url } = this.getUrls(service, OTPOperation.GET_DETAILS);

    const currentDate = getCurrentDateTime();

    const payload = {
      ...dto,
      date: currentDate,
      Mobileno: dto.mobileNumber,
      signature: createSignature(dto, currentDate, this.config.otpSalt),
    };

    console.log('payload===>', payload);

    const response = await this.mlClientApi.sendRequest({
      url,
      data: payload,
      baseURL: baseUrl,
      method: 'POST',
    });
    return response.data;
  }

  async validateOtp(
    data: InAppOtpDtoValidate,
    service: OTPService
  ): Promise<any> {
    const { baseUrl, url } = this.getUrls(service, OTPOperation.VALIDATE_OTP);

    const response = await this.mlClientApi.sendRequest({
      data,
      url,
      baseURL: baseUrl,
      method: 'POST',
    });
    return response.data;
  }

  private getUrls(service: OTPService, action?: OTPOperation) {
    const isSms = service === OTPService.SMS;

    switch (action) {
      case OTPOperation.VALIDATE_OTP:
        return {
          baseUrl: isSms
            ? this.config.smsOtpBaseUrl
            : this.config.inAppOtpBaseUrlValidate,
          url: isSms ? OTP.SMS_VALIDATE : OTP.IN_APP_VALIDATE,
        };
      default:
        return {
          baseUrl: isSms
            ? this.config.smsOtpBaseUrl
            : this.config.inAppOtpBaseUrlGetDetails,
          url: isSms ? OTP.SMS_GET_SMS : OTP.IN_APP_GET_DETAILS,
        };
    }
  }
}
