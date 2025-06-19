import { Body, Controller, Get, Post } from "@nestjs/common";
import { SmsOtpService } from "./sms-otp.service";
import { TestDto3 } from '@ml-workspace/common';
import { TestDto2 } from '@ml-workspace/dtos';

@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Get('/')
  getData() {
    return this.smsOtpService.getData();
  }

  @Post('/')
  createData(@Body() data: TestDto3 | TestDto2) {
    console.log('data==>', data);
    return { message: `Received data: ${JSON.stringify(data)}` };
  }
}