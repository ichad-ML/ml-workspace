import { JwtAuthGuard } from '@ml-workspace/common';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('crm-score')
export class CrmScoreController {
  @Get('/')
  getData(): { message: string } {
    return { message: 'CRM Score Service is running!' };
  }
}
