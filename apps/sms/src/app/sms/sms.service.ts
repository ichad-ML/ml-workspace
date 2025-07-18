import { Inject, Injectable } from "@nestjs/common";
import { MlClientApi } from "@ml-workspace/auth-lib";
import { SmsDto, SmsOtpResponseDto } from '@ml-workspace/common';
import { URLS } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { smsConfig } from '@ml-workspace/config';

@Injectable()
export class SmsService {
  constructor(
    @Inject(smsConfig.KEY)
    private readonly config: ConfigType<typeof smsConfig>,
    private readonly mlClientApi: MlClientApi
  ) {}

  async sendSms(dto: SmsDto): Promise<SmsOtpResponseDto> {
    const token = await this.generateToken();

    const data = {
      messageType: dto.type,
      text: dto.message,
      destination: dto.mobileNumber,
    };

    const response = await this.mlClientApi.sendRequest(
      {
        data,
        method: 'POST',
        url: URLS.SEND_SMS,
        baseURL: this.config.smsBaseUrl,
      },
      token
    );

    return response.data;
  }

  private async generateToken(): Promise<string> {
    const username = this.config.smsUsername;
    const password = this.config.smsPassword;

    const { data } = await this.mlClientApi.sendRequest({
      data: { username, password },
      method: 'POST',
      url: URLS.SMS_AUTH_LOGIN,
      baseURL: this.config.smsBaseUrl,
    });

    console.log('data==>', data);

    return data.accessToken;
  }
}