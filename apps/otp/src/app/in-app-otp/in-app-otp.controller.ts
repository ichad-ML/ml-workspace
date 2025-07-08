import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InAppOtpService } from './in-app-otp.service';
import { JwtAuthGuard } from '@ml-workspace/auth-lib';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  InAppOtpResponseDto,
} from '@ml-workspace/common';

// @UseGuards(JwtAuthGuard)
@Controller('in-app-otp')
export class InAppOtpController {
  constructor(private readonly inAppOtpService: InAppOtpService) {}

  @Post('/')
  async getInAppOtp(
    @Body() requestDto: InAppOtpDtoGetDetails
  ): Promise<InAppOtpResponseDto> {
    return this.inAppOtpService.getInAppOtp(requestDto);
  }

  @Post('/validate')
  validateInAppOtp(
    @Body() requestDto: InAppOtpDtoValidate
  ): Promise<InAppOtpResponseDto> {
    return this.inAppOtpService.validateInAppOtp(requestDto);
  }
}
