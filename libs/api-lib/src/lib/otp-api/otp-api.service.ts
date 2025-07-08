import { Inject, Injectable } from '@nestjs/common';
import { MlClientApi } from '@ml-workspace/auth-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  createInAppSignature,
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  OTPOperation,
  OTPService,
} from '@ml-workspace/common';
import { AUTHSERVICE, OTP, URLS } from '../../route';

@Injectable()
export class OtpApiService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly mlClientApi: MlClientApi
  ) {}

  async getOtp(dto: InAppOtpDtoGetDetails, service: OTPService): Promise<any> {
    const { baseUrl, url } = this.getUrls(service, OTPOperation.GET_DETAILS);

    const signature = createInAppSignature(dto, this.config.otpSalt);

    if (signature !== dto.signature) {
      throw new Error('Invalid signature...');
    }

    const { mobileNumber, ...restData } = dto;

    const payload = {
      ...restData,
      Mobileno: mobileNumber,
    };

    const response = await this.mlClientApi.sendRequest({
      url,
      data: payload,
      method: 'POST',
      baseURL: baseUrl,
    });
    return response.data;
  }

  async validateOtp(
    dto: InAppOtpDtoValidate,
    service: OTPService
  ): Promise<any> {
    const { baseUrl, url } = this.getUrls(service, OTPOperation.VALIDATE_OTP);

    const { mobileNumber, serviceType, ...restData } = dto;

    const payload = {
      ...restData,
      service_type: serviceType,
      mobile_no: mobileNumber,
    };

    const response = await this.mlClientApi.sendRequest({
      url,
      data: payload,
      method: 'POST',
      baseURL: baseUrl,
    });

    return response.data;
  }

  async validateDevice(data: any): Promise<any> {
    const response = await this.mlClientApi.sendRequest({
      data,
      method: 'POST',
      url: URLS.VALIDATE_DEVICE,
      baseURL: this.config.validateDeviceUrl,
    });

    return response.data;
  }

  async generateToken(apiKey: string, signature: string) {
    const data = { apiKey, signature };

    const response = await this.mlClientApi.sendRequest({
      data,
      method: 'POST',
      url: AUTHSERVICE.GENERATE_TOKEN,
      baseURL: this.config.authServiceUrl,
    });

    return response.data.data;
  }

  private getUrls(
    service: OTPService,
    action?: OTPOperation
  ): { baseUrl: string; url: string } {
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
