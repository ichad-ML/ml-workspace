import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import commonConfig from '../../config/common.config';

@Injectable()
export class SmsOtpService {
  constructor(
    @Inject(commonConfig.KEY)
    private readonly config: ConfigType<typeof commonConfig>
  ) {}

  getData() {
    console.log('Config:', this.config.port);
    return { message: 'SMS OTP Service is running!' };
  }
}
