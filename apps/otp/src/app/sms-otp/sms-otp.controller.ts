import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SmsOtpService } from './sms-otp.service';
import { JwtAuthGuard } from '@ml-workspace/auth-lib';

@UseGuards(JwtAuthGuard)
@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Get('/')
  getSmsOtp(body: any) {
    return this.smsOtpService.getSmsOtp(body);
  }

  @Post('/validate')
  validateSmsOtp(@Body() body: any) {
    return this.smsOtpService.validateSmsOtp(body);
  }
}
