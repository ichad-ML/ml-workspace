import { Module } from "@nestjs/common";
import { SmsService } from "./sms.service";
import { SmsController } from "./sms.controller";
import { MlClientApi } from "@ml-workspace/auth-lib";
import { ConfigModule } from "@nestjs/config";
import { smsConfig } from "@ml-workspace/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [smsConfig],
    }),
  ],
  providers: [SmsService, MlClientApi],
  controllers: [SmsController],
  exports: [],
})
export class SmsModule {}