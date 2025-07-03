import { Module } from "@nestjs/common";
import { OtpApiService } from "./otp-api.service";
import { MlClientApi } from '@ml-workspace/auth-lib';
import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [
  //   ConfigModule.forRoot({
  //     isGlobal: true,
  //     envFilePath: '.env',
  //   }),
  // ],
  providers: [OtpApiService, MlClientApi],
  controllers: [],
  exports: [OtpApiService],
})
export class OtpApiModule {}