import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SmsOtpService } from './sms-otp.service';
import { JwtAuthGuard } from '@ml-workspace/auth-lib';

// @UseGuards(JwtAuthGuard)
@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Post('/')
  async requestSmsOtp(body: any) {
    return this.smsOtpService.requestSmsOtp(body);
  }

  @Post('/verify')
  async verifySmsOtp(@Body() body: any) {
    return this.smsOtpService.verifySmsOtp(body);
  }
}
