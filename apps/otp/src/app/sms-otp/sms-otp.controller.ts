import { Body, Controller, Get, Post } from "@nestjs/common";
import { SmsOtpService } from "./sms-otp.service";
import { TestDto, TestDto2 } from "@ml-workspace/dtos";

@Controller('sms-otp')
export class SmsOtpController {
  constructor(private readonly smsOtpService: SmsOtpService) {}

  @Get('/')
  getData(): { message: string } {
    return this.smsOtpService.getData();
  }

  @Post('/')
  createData(@Body() data: TestDto) {
      console.log("data==>", data);
    return { message: `Received data: ${JSON.stringify(data)}` };
  }
}