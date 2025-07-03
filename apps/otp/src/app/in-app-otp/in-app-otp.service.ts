import { Inject, Injectable } from '@nestjs/common';
import { OtpApiService } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  OTPService,
} from '@ml-workspace/common';

@Injectable()
export class InAppOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService
  ) {}

  getInAppOtp(dto: InAppOtpDtoGetDetails) {
    return this.otpApiService.getOtp(dto, OTPService.IN_APP);
  }

  validateInAppOtp(dto: InAppOtpDtoValidate) {
    return this.otpApiService.validateOtp(dto, OTPService.IN_APP);
  }
}
