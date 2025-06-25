import { Module } from "@nestjs/common";
import { SmsOtpService } from "./sms-otp.service";
import { SmsOtpController } from "./sms-otp.controller";
import { OtpApiService } from '@ml-workspace/api-lib';

@Module({
  imports: [],
  controllers: [SmsOtpController],
  providers: [SmsOtpService, OtpApiService],
  exports: [],
})
export class SmsOtpModule {}