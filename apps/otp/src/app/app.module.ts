import { Module } from '@nestjs/common';
import { SmsOtpModule } from './sms-otp/sms-otp.module';
import { InAppOtpModule } from './in-app-otp/in-app-otp.module';

@Module({
  imports: [SmsOtpModule, InAppOtpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
