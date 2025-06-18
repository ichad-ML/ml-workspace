import { Module } from '@nestjs/common';
import { CrmScoreModule } from './crm-score/crm-score.module';

@Module({
  imports: [CrmScoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
