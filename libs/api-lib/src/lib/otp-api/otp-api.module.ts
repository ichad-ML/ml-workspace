import { Module } from "@nestjs/common";
import { OtpApiService } from "./otp-api.service";

@Module({
  imports: [],
  providers: [OtpApiService],
  controllers: [],
  exports: [OtpApiService],
})
export class OtpApiModule {}