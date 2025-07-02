import { Inject, Injectable } from '@nestjs/common';
import { OtpApiService } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
} from '@ml-workspace/common';
import { OTP } from '../common/utils/route';

@Injectable()
export class InAppOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService
  ) {}

  getInAppOtp(data: InAppOtpDtoGetDetails) {
    return this.otpApiService.getOtp({
      data,
      method: 'POST',
      url: OTP.IN_APP_GET_DETAILS,
      baseUrl: this.config.inAppOtpBaseUrlGetDetails,
    });
  }

  validateInAppOtp(data: InAppOtpDtoValidate) {
    return this.otpApiService.validateOtp({
      data,
      method: 'POST',
      url: OTP.IN_APP_VALIDATE,
      baseUrl: this.config.inAppOtpBaseUrlValidate,
    });
  }
}
