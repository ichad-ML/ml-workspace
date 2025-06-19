import { Inject, Injectable } from '@nestjs/common';
import commonConfig from '../../config/common.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class InAppOtpService {
  constructor(
    @Inject(commonConfig.KEY)
    private readonly config: ConfigType<typeof commonConfig>
  ) {}
}
