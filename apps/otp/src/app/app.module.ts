import { Module } from '@nestjs/common';
import { SmsOtpModule } from './sms-otp/sms-otp.module';
import { InAppOtpModule } from './in-app-otp/in-app-otp.module';
import { ConfigModule } from '@nestjs/config';
import commonConfig from '../config/common.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigModule.forRoot({
      load: [commonConfig],
      isGlobal: true,
    }),
    SmsOtpModule,
    InAppOtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
