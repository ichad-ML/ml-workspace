import { Inject, Injectable } from '@nestjs/common';
import { MlClientApi } from '@ml-workspace/auth-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  createSignature,
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

    const signature = createSignature(dto, this.config.otpSalt);

    if (signature !== dto.signature) {
      throw new Error('Invalid signature...');
    }

    const payload = {
      ...dto,
      Mobileno: dto.mobileNumber,
    };

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

    console.log('urls==>', { baseUrl, url });

    const payload = {
      ...data,
      mobile_no: data.mobileNumber,
      service_type: data.serviceType,
    };

    const response = await this.mlClientApi.sendRequest({
      url,
      data: payload,
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
