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
    return this.otpApiService.getOtp({
      baseUrl: this.config.inAppOtpBaseUrl,
      url: '/users',
      method: 'GET',
    });
  }
}
