import { JwtAuthGuard } from '@ml-workspace/auth-lib';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CrmScoreService } from './crm-score.service';

@UseGuards(JwtAuthGuard)
@Controller('crm-score')
export class CrmScoreController {
  constructor(private readonly crmScoreService: CrmScoreService) {}
  @Get('/')
  getData() {
    return this.crmScoreService.getData();
  }
}
