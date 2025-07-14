import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InAppOtpService } from './in-app-otp.service';
import { JwtAuthGuard, OtpRateLimitGuard } from '@ml-workspace/auth-lib';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  InAppOtpResponseDto,
} from '@ml-workspace/common';

// @UseGuards(JwtAuthGuard)
@UseGuards(OtpRateLimitGuard)
@Controller('in-app-otp')
export class InAppOtpController {
  constructor(private readonly inAppOtpService: InAppOtpService) {}

  @Post('/')
  async requestInAppOtp(
    @Body() requestDto: InAppOtpDtoGetDetails
  ): Promise<InAppOtpResponseDto> {
    return this.inAppOtpService.requestInAppOtp(requestDto);
  }

  @Post('/verify')
  async verifyOtp(@Body() requestDto: InAppOtpDtoValidate) {
    return this.inAppOtpService.verifyOtp(requestDto);
  }
}
