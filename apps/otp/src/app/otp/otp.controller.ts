import { Body, Controller, Post } from "@nestjs/common";
import { OtpService } from "./otp.service";
import {
  CollectionType,
  OtpRequestDto,
  OtpVerifyDto,
  OtpResponseDto,
  isSmsOTP,
  OtpVerifyResponseDto,
} from '@ml-workspace/common';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/')
  async requestInAppOtp(
    @Body() requestDto: OtpRequestDto
  ): Promise<OtpResponseDto> {
    if (isSmsOTP(requestDto.otpType)) {
      return this.otpService.requestInAppOtp(
        requestDto,
        CollectionType.SMS_OTP
      );
    }

    return this.otpService.requestInAppOtp(
      requestDto,
      CollectionType.IN_APP_OTP
    );
  }

  @Post('/verify')
  async verifyOtp(
    @Body() requestDto: OtpVerifyDto
  ): Promise<OtpVerifyResponseDto> {
    if (isSmsOTP(requestDto.otpType)) {
      return this.otpService.verifyOtp(requestDto, CollectionType.SMS_OTP);
    }

    return this.otpService.verifyOtp(requestDto, CollectionType.IN_APP_OTP);
  }
}