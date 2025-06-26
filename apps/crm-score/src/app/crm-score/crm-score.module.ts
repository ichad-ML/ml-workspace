import { Module } from "@nestjs/common";
import { CrmScoreController } from "./crm-score.controlle";
import { CrmScoreService } from "./crm-score.service";
import { CrmApiModule } from '../api/crm-api.module';

@Module({
  imports: [CrmApiModule],
  controllers: [CrmScoreController],
  providers: [CrmScoreService],
})
export class CrmScoreModule {}