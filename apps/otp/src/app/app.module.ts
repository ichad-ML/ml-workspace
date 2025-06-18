import { Module } from '@nestjs/common';
import { SmsOtpModule } from './sms-otp/sms-otp.module';
import { InAppOtpModule } from './in-app-otp/in-app-otp.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SmsOtpModule,
    InAppOtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
