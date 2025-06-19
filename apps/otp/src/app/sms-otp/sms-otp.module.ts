import { Module } from "@nestjs/common";
import { SmsOtpService } from "./sms-otp.service";
import { SmsOtpController } from "./sms-otp.controller";
import { OtpApiService } from '../common/otp-api/otp-api.service';

@Module({
  imports: [],
  controllers: [SmsOtpController],
  providers: [SmsOtpService, OtpApiService],
  exports: [],
})
export class SmsOtpModule {}