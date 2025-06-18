import { Module } from '@nestjs/common';
import { CrmScoreModule } from './crm-score/crm-score.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CrmScoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
