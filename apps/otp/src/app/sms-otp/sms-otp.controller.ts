import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SmsOtpService } from './sms-otp.service';
import { JwtAuthGuard } from '@ml-workspace/auth-lib';
import { TestDto } from '@ml-workspace/common';

// @UseGuards(JwtAuthGuard)
@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Get('/')
  getData() {
    return this.smsOtpService.getData();
  }

  @Post('/')
  createData(@Body() data: TestDto) {
    return { message: `Received data: ${JSON.stringify(data)}` };
  }
}
