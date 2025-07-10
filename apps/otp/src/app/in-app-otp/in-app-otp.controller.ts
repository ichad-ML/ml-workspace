import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InAppOtpService } from './in-app-otp.service';
import { JwtAuthGuard } from '@ml-workspace/auth-lib';
import {
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  InAppOtpResponseDto,
} from '@ml-workspace/common';
import {
  generateSecret,
  generateToken,
  verifyToken,
} from '../common/otp/otplib';

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

  @Post('/request-otp')
  async requestInAppOtp(@Body() requestDto: InAppOtpDtoGetDetails) {
    return this.inAppOtpService.requestInAppOtp(requestDto);
  }

  @Post('verify')
  verifyOtp(@Body() requestDto: InAppOtpDtoValidate) {
    return this.inAppOtpService.verifyOtp(requestDto);
  }

  @Post('/validate')
  validateInAppOtp(
    @Body() requestDto: InAppOtpDtoValidate
  ): Promise<InAppOtpResponseDto> {
    return this.inAppOtpService.validateInAppOtp(requestDto);
  }
}
