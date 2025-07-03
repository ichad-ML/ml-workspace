import { Inject, Injectable } from '@nestjs/common';
import { OtpApiService } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  OtpService,
} from '@ml-workspace/common';

@Injectable()
export class InAppOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService
  ) {}

  getInAppOtp(data: InAppOtpDtoGetDetails) {
    return this.otpApiService.getOtp(data, OtpService.IN_APP);
  }

  validateInAppOtp(data: InAppOtpDtoValidate) {
    return this.otpApiService.validateOtp(data, OtpService.IN_APP);
  }
}
