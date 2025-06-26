import { Module } from '@nestjs/common';
import { CrmScoreModule } from './crm-score/crm-score.module';
import { ConfigModule } from '@nestjs/config';
import { CrmApiModule } from './api/crm-api.module';
import { crmConfig } from '@ml-workspace/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [crmConfig],
    }),
    CrmScoreModule,
    CrmApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
