import { Inject, Injectable } from '@nestjs/common';
import { OtpType } from '@ml-workspace/common';
import { OtpApiService } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { commonConfig } from '@ml-workspace/config';

@Injectable()
export class InAppOtpService {

  constructor(
    @Inject(commonConfig.KEY)
    private readonly config: ConfigType<typeof commonConfig>,
    private readonly otpApiService: OtpApiService) { }

  getData() {
    // return { message: 'In-App OTP Service is running', type: OtpType.IN_APP };
    return this.otpApiService.getOtp(this.config.inAppOtpBaseUrl);
  }
}
