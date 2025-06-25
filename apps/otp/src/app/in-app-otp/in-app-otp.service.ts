import { Injectable } from '@nestjs/common';
import { OtpType } from '@ml-workspace/common';
import { OtpApiService } from '@ml-workspace/api-lib';

@Injectable()
export class InAppOtpService {
  constructor(private readonly otpApiService: OtpApiService) {}

  getData() {
    return { message: 'In-App OTP Service is running', type: OtpType.IN_APP };
    // return this.otpApiService.sendOtp('1234567890', OtpType.SMS);
  }
}
