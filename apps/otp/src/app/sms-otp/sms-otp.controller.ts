import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SmsOtpService } from './sms-otp.service';
import { JwtAuthGuard } from '@ml-workspace/auth-lib';
import { SmsGetOtp } from '@ml-workspace/common';

// @UseGuards(JwtAuthGuard)
@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Post('/')
  async requestSmsOtp(@Body() requestDto: SmsGetOtp) {
    console.log('requestDto==>', requestDto);
    return this.smsOtpService.requestSmsOtp(requestDto);
  }

  @Post('/verify')
  async verifySmsOtp(@Body() body: any) {
    return this.smsOtpService.verifySmsOtp(body);
  }
}
