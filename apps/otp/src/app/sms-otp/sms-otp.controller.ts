import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SmsOtpService } from './sms-otp.service';
import { TestDto2 } from '@ml-workspace/dtos';
import { JwtAuthGuard } from '@ml-workspace/common';

@UseGuards(JwtAuthGuard)
@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Get('/')
  getData() {
    return this.smsOtpService.getData();
  }

  @Post('/')
  createData(@Body() data: TestDto2) {
    return { message: `Received data: ${JSON.stringify(data)}` };
  }
}
