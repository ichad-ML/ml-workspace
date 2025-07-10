import { Module } from '@nestjs/common';
import { InAppOtpController } from './in-app-otp.controller';
import { InAppOtpService } from './in-app-otp.service';
import { OtpApiService } from '@ml-workspace/api-lib';
import { MlClientApi } from '@ml-workspace/auth-lib';
import { FirebaseService } from '../common/firebase/firebase.service';

@Module({
  imports: [],
  controllers: [InAppOtpController],
  providers: [InAppOtpService, OtpApiService, MlClientApi, FirebaseService],
  exports: [],
})
export class InAppOtpModule {}
