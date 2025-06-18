import { Module } from "@nestjs/common";
import { InAppOtpController } from "./in-app-otp.controller";
import { InAppOtpService } from "./in-app-otp.service";

@Module({
  imports: [],
  controllers: [InAppOtpController],
  providers: [InAppOtpService],
  exports: [],
})
export class InAppOtpModule {}