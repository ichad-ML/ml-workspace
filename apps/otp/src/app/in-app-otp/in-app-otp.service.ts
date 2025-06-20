import { Inject, Injectable } from '@nestjs/common';
import commonConfig from '../../config/common.config';
import type { ConfigType } from '@nestjs/config';
import { OtpApiService } from '../common/otp-api/otp-api.service';
import { OtpType } from '@ml-workspace/enums';

@Injectable()
export class InAppOtpService {
  constructor(
    @Inject(commonConfig.KEY)
    private readonly config: ConfigType<typeof commonConfig>,
    private readonly otpApiService: OtpApiService
  ) {}

  getData() {
    console.log('Config:', this.config.port);
    return { message: 'In-App OTP Service is running' };
    return this.otpApiService.sendOtp('1234567890', OtpType.SMS);
  }
}
