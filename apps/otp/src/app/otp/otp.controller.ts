import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OtpService } from './otp.service';
import {
  CollectionType,
  OtpRequestDto,
  OtpVerifyDto,
  OtpResponseDto,
  isSmsOTP,
  OtpVerifyResponseDto,
} from '@ml-workspace/common';
import { OtpRateLimitGuard } from '@ml-workspace/auth-lib';

@UseGuards(OtpRateLimitGuard)
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/')
  async requestOtp(@Body() requestDto: OtpRequestDto): Promise<OtpResponseDto> {
    const collection = isSmsOTP(requestDto.otpType)
      ? CollectionType.SMS_OTP
      : CollectionType.IN_APP_OTP;

    return this.otpService.requestOtp(requestDto, collection);
  }

  @Post('/verify')
  async verifyOtp(
    @Body() requestDto: OtpVerifyDto
  ): Promise<OtpVerifyResponseDto> {
    const collection = isSmsOTP(requestDto.otpType)
      ? CollectionType.SMS_OTP
      : CollectionType.IN_APP_OTP;

    return this.otpService.verifyOtp(requestDto, collection);
  }
}
