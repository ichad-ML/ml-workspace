import { Module } from "@nestjs/common";
import { SmsOtpService } from "./sms-otp.service";
import { SmsOtpController } from "./sms-otp.controller";
import { OtpApiModule, OtpApiService } from '@ml-workspace/api-lib';
import { MlClientApi } from '@ml-workspace/auth-lib';

@Module({
  imports: [],
  controllers: [SmsOtpController],
  providers: [SmsOtpService, OtpApiService, MlClientApi],
  exports: [],
})
export class SmsOtpModule {}