import { OtpApiService } from '@ml-workspace/api-lib';
import { OTPService } from '@ml-workspace/common';
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

  getSmsOtp(data: any) {
    return this.otpApiService.getOtp(data, OTPService.SMS);
  }

  validateSmsOtp(data: any) {
    return this.otpApiService.validateOtp(data, OTPService.SMS);
  }
}
