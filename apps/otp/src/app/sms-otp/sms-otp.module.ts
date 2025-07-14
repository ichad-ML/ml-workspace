import { Module } from "@nestjs/common";
import { SmsOtpService } from "./sms-otp.service";
import { SmsOtpController } from "./sms-otp.controller";
import { OtpApiService } from '@ml-workspace/api-lib';
import { MlClientApi } from '@ml-workspace/auth-lib';
import { FirebaseService } from '../common/firebase/firebase.service';

@Module({
  imports: [],
  controllers: [SmsOtpController],
  providers: [SmsOtpService, OtpApiService, MlClientApi, FirebaseService],
  exports: [],
})
export class SmsOtpModule {}