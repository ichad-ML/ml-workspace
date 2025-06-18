import { Module } from "@nestjs/common";
import { SmsOtpService } from "./sms-otp.service";
import { SmsOtpController } from "./sms-otp.controller";

@Module({
  imports: [],
  controllers: [SmsOtpController],
  providers: [SmsOtpService],
  exports: [],
})
export class SmsOtpModule {}