import { OtpApiService } from '@ml-workspace/api-lib';
import { commonConfig } from '@ml-workspace/config';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class SmsOtpService {
  constructor(
    @Inject(commonConfig.KEY)
    private readonly config: ConfigType<typeof commonConfig>,
    private readonly otpApiService: OtpApiService
  ) {}

  getData() {
    return this.otpApiService.getOtp(this.config.smsOtpBaseUrl);
    // return { message: 'SMS OTP Service is running!' };
  }
}
