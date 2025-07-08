import { Inject, Injectable } from '@nestjs/common';
import { OtpApiService } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  createHashSignature,
  DateFormat,
  getCurrentDate,
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  OTPService,
} from '@ml-workspace/common';

@Injectable()
export class InAppOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService
  ) {}

  async getInAppOtp(dto: InAppOtpDtoGetDetails) {
    return this.otpApiService.getOtp(dto, OTPService.IN_APP);
  }

  async validateInAppOtp(dto: InAppOtpDtoValidate) {
    return this.otpApiService.validateOtp(dto, OTPService.IN_APP);
  }

  async validateDevice(deviceId: string) {
    return this.otpApiService.validateDevice(deviceId);
  }

  async generateToken() {
    return this.otpApiService.generateToken(
      this.config.apiKey,
      await this.createSignature()
    );
  }

  async createSignature() {
    const apiKey = this.config.apiKey;
    const secretKey = this.config.secretKey;
    const currentDate = getCurrentDate(DateFormat.DMY);
    const data = [apiKey, secretKey, currentDate.trim()].join('|');
    console.log('data==>', data);
    return createHashSignature(data);
  }
}

