import { Module } from "@nestjs/common";
import { InAppOtpController } from "./in-app-otp.controller";
import { InAppOtpService } from "./in-app-otp.service";
import { OtpApiService } from '../common/otp-api/otp-api.service';

@Module({
  imports: [],
  controllers: [InAppOtpController],
  providers: [InAppOtpService, OtpApiService],
  exports: [],
})
export class InAppOtpModule {}