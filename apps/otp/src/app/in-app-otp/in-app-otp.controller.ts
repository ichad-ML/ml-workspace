import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InAppOtpService } from './in-app-otp.service';
import { JwtAuthGuard } from '@ml-workspace/auth-lib';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
} from '@ml-workspace/common';

// @UseGuards(JwtAuthGuard)
@Controller('in-app-otp')
export class InAppOtpController {
  constructor(private readonly inAppOtpService: InAppOtpService) {}

  @Post('/')
  getInAppOtp(@Body() requestDto: InAppOtpDtoGetDetails) {
    console.log('Transformed DTO:', requestDto);
    return this.inAppOtpService.getInAppOtp(requestDto);
  }

  @Post('/validate')
  validateInAppOtp(@Body() requestDto: InAppOtpDtoValidate) {
    return this.inAppOtpService.validateInAppOtp(requestDto);
  }
}
