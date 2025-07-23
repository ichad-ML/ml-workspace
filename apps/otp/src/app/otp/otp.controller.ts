import { Body, Controller, Post } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { InAppOtpValidateDto, OTPCollection, OtpRequestDto } from "@ml-workspace/common";

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/')
  async requestInAppOtp(@Body() requestDto: OtpRequestDto) {
    if (requestDto.otpType === OTPCollection.SMS_OTP) {
      return this.otpService.requestInAppOtp(requestDto, OTPCollection.SMS_OTP);
    }

    return this.otpService.requestInAppOtp(requestDto, OTPCollection.IN_APP_OTP);
  }

  @Post('/verify')
  async verifyOtp(@Body() requestDto: InAppOtpValidateDto) {
    if (requestDto.otpType === OTPCollection.SMS_OTP) {
      return this.otpService.verifyOtp(requestDto, OTPCollection.SMS_OTP);
    }

    return this.otpService.verifyOtp(requestDto, OTPCollection.IN_APP_OTP);
  }
}