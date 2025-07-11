import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OtpApiService } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  CODE,
  createInAppSignature,
  createTokenSignature,
  DateFormat,
  getCurrentDate,
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  InAppOtpResponseDto,
  MESSAGE,
} from '@ml-workspace/common';
import { generateOTP, generateSecret, verifyToken } from '../common/otp/otplib';
import { FirebaseService } from '../common/firebase/firebase.service';

@Injectable()
export class InAppOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService,
    private readonly firebaseService: FirebaseService
  ) {}

  async requestInAppOtp(
    dto: InAppOtpDtoGetDetails
  ): Promise<InAppOtpResponseDto> {
    const { token } = await this.generateToken();

    await this.otpApiService.validateDevice(
      dto.deviceId,
      dto.mobileNumber,
      token
    );

    const currentDate = getCurrentDate(DateFormat.YMD_Hms);
    const signature = createInAppSignature(dto, this.config.otpSalt);

    if (signature !== dto.signature) {
      throw new BadRequestException('Invalid signature...');
    }

    const secret = generateSecret();
    const otp = generateOTP(secret, dto.timeLimit);

    const {
      deviceId,
      password,
      signature: dtoSignature,
      date,
      ...restData
    } = dto;

    const document = await this.firebaseService.createInAppDocument({
      request: { ...restData, requestedAt: currentDate, secret, otp },
    });

    return {
      code: CODE.SUCCESS,
      name: MESSAGE.SUCCESS,
      OTP: otp,
      id: document.id,
      token: signature,
      message: 'OTP successfully generated.',
      timelimit: dto.timeLimit.toString(),
    } as unknown as InAppOtpResponseDto;
  }

  async verifyOtp(dto: InAppOtpDtoValidate) {
    const document = await this.firebaseService.getDocument('in-app', dto.id);

    const { isValid, isExpired, message } = verifyToken(
      document.request.secret,
      dto.otp,
      dto.timeLimit
    );

    if (isExpired || !isValid) throw new BadRequestException(message);

    const currentTime = getCurrentDate(DateFormat.YMD_Hms);

    await this.firebaseService.updateDocument('in-app', dto.id, {
      validate: {
        isValid,
        message,
        isExpired,
        otp: dto.otp,
        validatedAt: currentTime,
      },
    });

    return {
      message,
      code: CODE.SUCCESS,
      name: MESSAGE.SUCCESS,
    };
  }

  async generateToken() {
    const apiKey = this.config.apiKey;
    const secretKey = this.config.secretKey;

    const signature = await createTokenSignature(apiKey, secretKey);

    return this.otpApiService.generateToken(apiKey, signature);
  }

  // async getInAppOtp(dto: InAppOtpDtoGetDetails): Promise<InAppOtpResponseDto> {
  //   const { baseUrl, url } = this.getUrls(
  //     OTPService.IN_APP,
  //     OTPOperation.GET_DETAILS
  //   );

  //   const signature = createInAppSignature(dto, this.config.otpSalt);

  //   if (signature !== dto.signature) {
  //     throw new BadRequestException('Invalid signature...');
  //   }

  //   const { mobileNumber, ...restData } = dto;

  //   const payload = {
  //     ...restData,
  //     Mobileno: mobileNumber,
  //   } as unknown as InAppOtpDtoGetDetails;

  //   return this.otpApiService.getOtp(payload, url, baseUrl);
  // }

  // async validateInAppOtp(
  //   dto: InAppOtpDtoValidate
  // ): Promise<InAppOtpResponseDto> {
  //   // await this.otpApiService.validateDevice(dto.deviceId, dto.mobileNumber);

  //   const { baseUrl, url } = this.getUrls(
  //     OTPService.IN_APP,
  //     OTPOperation.VALIDATE_OTP
  //   );

  //   const { mobileNumber, serviceType, ...restData } = dto;

  //   const payload = {
  //     ...restData,
  //     service_type: serviceType,
  //     mobile_no: mobileNumber,
  //   } as unknown as InAppOtpDtoValidate;

  //   return this.otpApiService.validateOtp(payload, url, baseUrl);
  // }

  // private getUrls(
  //   service: OTPService,
  //   action?: OTPOperation
  // ): { baseUrl: string; url: string } {
  //   const isSms = service === OTPService.SMS;

  //   switch (action) {
  //     case OTPOperation.VALIDATE_OTP:
  //       return {
  //         baseUrl: isSms
  //           ? this.config.smsOtpBaseUrl
  //           : this.config.inAppOtpBaseUrlValidate,
  //         url: isSms ? OTP.SMS_VALIDATE : OTP.IN_APP_VALIDATE,
  //       };

  //     default:
  //       return {
  //         baseUrl: isSms
  //           ? this.config.smsOtpBaseUrl
  //           : this.config.inAppOtpBaseUrlGetDetails,
  //         url: isSms ? OTP.SMS_GET_SMS : OTP.IN_APP_GET_DETAILS,
  //       };
  //   }
  // }
}
