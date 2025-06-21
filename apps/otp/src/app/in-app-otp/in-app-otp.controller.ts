import { Controller, Get, UseGuards } from '@nestjs/common';
import { InAppOtpService } from './in-app-otp.service';
import { JwtAuthGuard } from '@ml-workspace/common';

@UseGuards(JwtAuthGuard) 
@Controller('in-app-otp')
export class InAppOtpController {
  constructor(private readonly inAppOtpService: InAppOtpService) {}

  @Get('/') // test endpoint - to be deleted later
  getData() {
    return this.inAppOtpService.getData();
  }
}
