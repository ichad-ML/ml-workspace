import { Module } from '@nestjs/common';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [SmsModule],
  providers: [],
  exports: [],
})
export class AppModule {}
