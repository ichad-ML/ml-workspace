import { Body, Controller, Get, Post } from "@nestjs/common";
import { SmsOtpService } from "./sms-otp.service";
import { TestDto3 } from '@ml-workspace/common';

@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Get('/')
  getData() {
    return this.smsOtpService.getData();
  }

  @Post('/')
  createData(@Body() data: TestDto3) {
    console.log('data==>', data);
    return { message: `Received data: ${JSON.stringify(data)}` };
  }
}