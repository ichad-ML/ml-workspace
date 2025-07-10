import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OTP, OtpApiService } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  createInAppSignature,
  createSignatureForToken,
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  InAppOtpResponseDto,
  OTPOperation,
  OTPService,
} from '@ml-workspace/common';
import {
  generateSecret,
  generateToken,
  verifyToken,
} from '../common/otp/otplib';
import { FirebaseService } from '../common/firebase/firebase.service';

@Injectable()
export class InAppOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService,
    private readonly firebaseService: FirebaseService
  ) {}

  async requestInAppOtp(requestDto: InAppOtpDtoGetDetails) {
    const secret = generateSecret();
    const token = generateToken(secret, +requestDto.timeLimit);

    const doc = await this.firebaseService.createInAppDocument({
      secret,
      ...requestDto,
    });

    return {
      otp: token,
      expiresIn: requestDto.timeLimit,
      id: doc.id,
    };
  }

  async verifyOtp(requestDto: InAppOtpDtoValidate) {
    const doc = await this.firebaseService.getDocument('in-app', requestDto.id);

    const secret = doc.secret;
    const isValid = verifyToken(secret, requestDto.otp, +requestDto.timeLimit);
    return { valid: isValid };
  }

  async getInAppOtp(dto: InAppOtpDtoGetDetails): Promise<InAppOtpResponseDto> {
    const { baseUrl, url } = this.getUrls(
      OTPService.IN_APP,
      OTPOperation.GET_DETAILS
    );

    const signature = createInAppSignature(dto, this.config.otpSalt);

    if (signature !== dto.signature) {
      throw new BadRequestException('Invalid signature...');
    }

    const { mobileNumber, ...restData } = dto;

    const payload = {
      ...restData,
      Mobileno: mobileNumber,
    } as unknown as InAppOtpDtoGetDetails;

    return this.otpApiService.getOtp(payload, url, baseUrl);
  }

  async validateInAppOtp(
    dto: InAppOtpDtoValidate
  ): Promise<InAppOtpResponseDto> {
    // await this.otpApiService.validateDevice(dto.deviceId, dto.mobileNumber);

    const { baseUrl, url } = this.getUrls(
      OTPService.IN_APP,
      OTPOperation.VALIDATE_OTP
    );

    const { mobileNumber, serviceType, ...restData } = dto;

    const token = await this.generateToken();
    console.log('token==>', token);

    const payload = {
      ...restData,
      service_type: serviceType,
      mobile_no: mobileNumber,
    } as unknown as InAppOtpDtoValidate;

    return this.otpApiService.validateOtp(payload, url, baseUrl);
  }

  async generateToken() {
    const apiKey = this.config.apiKey;
    const secretKey = this.config.secretKey;

    const signature = createSignatureForToken(apiKey, secretKey);

    return this.otpApiService.generateToken(apiKey, signature);
  }

  private getUrls(
    service: OTPService,
    action?: OTPOperation
  ): { baseUrl: string; url: string } {
    const isSms = service === OTPService.SMS;

    switch (action) {
      case OTPOperation.VALIDATE_OTP:
        return {
          baseUrl: isSms
            ? this.config.smsOtpBaseUrl
            : this.config.inAppOtpBaseUrlValidate,
          url: isSms ? OTP.SMS_VALIDATE : OTP.IN_APP_VALIDATE,
        };

      default:
        return {
          baseUrl: isSms
            ? this.config.smsOtpBaseUrl
            : this.config.inAppOtpBaseUrlGetDetails,
          url: isSms ? OTP.SMS_GET_SMS : OTP.IN_APP_GET_DETAILS,
        };
    }
  }
}
