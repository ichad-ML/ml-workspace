import { OtpApiService } from '@ml-workspace/api-lib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsOtpService {
  constructor(private readonly otpApiService: OtpApiService) {}

  getData() {
    return this.otpApiService.getOtp();
    // return { message: 'SMS OTP Service is running!' };
  }
}
