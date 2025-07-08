import { Inject, Injectable } from '@nestjs/common';
import { MlClientApi } from '@ml-workspace/auth-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import { AUTHSERVICE, URLS } from '../../route';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  InAppOtpResponseDto,
} from '@ml-workspace/common';

@Injectable()
export class OtpApiService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly mlClientApi: MlClientApi
  ) {}

  async getOtp(
    data: InAppOtpDtoGetDetails,
    url: string,
    baseUrl: string
  ): Promise<InAppOtpResponseDto> {
    const response = await this.mlClientApi.sendRequest({
      url,
      data,
      method: 'POST',
      baseURL: baseUrl,
    });
    return response.data;
  }

  async validateOtp(
    data: InAppOtpDtoValidate,
    url: string,
    baseUrl: string
  ): Promise<InAppOtpResponseDto> {
    const response = await this.mlClientApi.sendRequest({
      url,
      data,
      method: 'POST',
      baseURL: baseUrl,
    });

    return response.data;
  }

  async validateDevice(
    deviceUniqueId: string,
    mobileNumber: string
  ): Promise<any> {
    const response = await this.mlClientApi.sendRequest({
      data: { deviceUniqueId, mobileNumber },
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
}
