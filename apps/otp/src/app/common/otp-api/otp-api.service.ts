import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import axios, { AxiosInstance } from 'axios';
import type { ConfigType } from "@nestjs/config";
import { OtpType } from '@ml-workspace/common';
import { commonConfig } from '@ml-workspace/config';

@Injectable()
export class OtpApiService implements OnModuleInit {
  private smsHttpClient: AxiosInstance;
  private inappHttpClient: AxiosInstance;

  constructor(
    @Inject(commonConfig.KEY)
    private readonly config: ConfigType<typeof commonConfig>
  ) {}

  onModuleInit() {
    this.smsHttpClient = axios.create({
      baseURL: "", // SMS OTP API base URL
      headers: {
        Authorization: `Bearer`, // token
      },
    });

    this.inappHttpClient = axios.create({
      baseURL: "", // In-App OTP API base URL
      headers: {
        Authorization: `Bearer `, // token
      },
    });
  }

  async sendOtp(phoneNumber: string, type: OtpType): Promise<any> {
    const client =
      type === OtpType.SMS ? this.smsHttpClient : this.inappHttpClient;

    const endpoint = type === OtpType.SMS ? '/sms-otp' : '/in-app-otp';

    try {
      const response = await client.post(endpoint, { phoneNumber });
      return response.data;
    } catch (error: any) {
      console.error(`Failed to send ${type} OTP:`, error.message);
      throw error;
    }
  }

  async verifyOtp(
    code: string,
    phoneNumber: string,
    type: OtpType
  ): Promise<any> {
    const client =
      type === OtpType.SMS ? this.smsHttpClient : this.inappHttpClient;

    const endpoint = type === OtpType.SMS ? '/verify-sms' : '/verify-inapp';

    try {
      const response = await client.post(endpoint, { code, phoneNumber });
      return response.data;
    } catch (error: any) {
      console.error(`Failed to verify ${type} OTP:`, error.message);
      throw error;
    }
  }
}
