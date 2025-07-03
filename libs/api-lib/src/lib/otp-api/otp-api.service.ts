import { Inject, Injectable } from '@nestjs/common';
import { MlClientApi } from '@ml-workspace/auth-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  OtpService,
  OtpType,
} from '@ml-workspace/common';
import { OTP } from '../../route';

@Injectable()
export class OtpApiService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly mlClientApi: MlClientApi
  ) {}

  async getOtp(data: InAppOtpDtoGetDetails, service: OtpService): Promise<any> {
    const { baseUrl, url } = this.getUrls(service, OtpType.GET_DETAILS);

    const response = await this.mlClientApi.sendRequest({
      data,
      url,
      baseURL: baseUrl,
      method: 'POST',
    });
    return response.data;
  }

  async validateOtp(
    data: InAppOtpDtoValidate,
    service: OtpService
  ): Promise<any> {
    const { baseUrl, url } = this.getUrls(service, OtpType.VALIDATE_OTP);

    const response = await this.mlClientApi.sendRequest({
      data,
      url,
      baseURL: baseUrl,
      method: 'POST',
    });
    return response.data;
  }

  private getUrls(service: OtpService, type?: OtpType) {
    const isSms = service === OtpService.SMS;

    switch (type) {
      case OtpType.VALIDATE_OTP:
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
