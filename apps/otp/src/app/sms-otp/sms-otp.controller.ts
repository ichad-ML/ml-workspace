import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SmsOtpService } from './sms-otp.service';
import { JwtAuthGuard } from '@ml-workspace/auth-lib';
import { SmsOtpRequestDto } from '@ml-workspace/common';

// @UseGuards(JwtAuthGuard)
@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Post('/')
  async requestSmsOtp(@Body() requestDto: SmsOtpRequestDto) {
    return this.smsOtpService.requestSmsOtp(requestDto);
  }

  @Post('/verify')
  async validateOtp(@Body() body: any) {
    return this.smsOtpService.validateSmsOtp(body);
  }
}
