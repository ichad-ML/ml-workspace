import { Module } from "@nestjs/common";
import { OtpController } from "./otp.controller";
import { OtpService } from "./otp.service";
import { OtpApiService } from "@ml-workspace/api-lib";
import { FirebaseService } from "../common/firebase/firebase.service";
import { MlClientApi } from "@ml-workspace/auth-lib";
import { LoggerModule } from '@ml-workspace/common';

@Module({
  imports: [LoggerModule],
  controllers: [OtpController],
  providers: [OtpService, OtpApiService, FirebaseService, MlClientApi],
  exports: [],
})
export class OtpModule {}