import { Module } from "@nestjs/common";
import { SmsService } from "./sms.service";
import { SmsController } from "./sms.controller";
import { MlClientApi } from "@ml-workspace/auth-lib";
import { ConfigModule } from "@nestjs/config";
import { smsConfig } from "@ml-workspace/config";
import { SmsApiService } from '../services/sms-api.service';
import { TokenService } from '../services/token.service';
import { CustomLoggerService } from '@ml-workspace/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [smsConfig],
    }),
  ],
  providers: [
    SmsService,
    MlClientApi,
    SmsApiService,
    TokenService,
    CustomLoggerService,
  ],
  controllers: [SmsController],
  exports: [],
})
export class SmsModule {}