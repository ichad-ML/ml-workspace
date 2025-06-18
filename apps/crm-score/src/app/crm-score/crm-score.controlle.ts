import { Controller, Get } from '@nestjs/common';

@Controller('crm-score')
export class CrmScoreController {
  @Get('/')
  getData(): { message: string } {
    return { message: 'CRM Score Service is running!' };
  }
}
