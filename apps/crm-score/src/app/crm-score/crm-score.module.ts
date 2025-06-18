import { Module } from "@nestjs/common";
import { CrmScoreController } from "./crm-score.controlle";
import { CrmScoreService } from "./crm-score.service";

@Module({
    imports: [],
    controllers: [CrmScoreController],
    providers: [CrmScoreService],
})
export class CrmScoreModule { }