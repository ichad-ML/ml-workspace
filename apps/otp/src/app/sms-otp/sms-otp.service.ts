import { OtpApiService } from '@ml-workspace/api-lib';
import { otpConfig } from '@ml-workspace/config';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class SmsOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService
  ) {}

  getData() {
    return this.otpApiService.getOtp({
      method: 'GET',
      url: '/posts',
      baseUrl: this.config.smsOtpBaseUrl,
    });
  }
}
