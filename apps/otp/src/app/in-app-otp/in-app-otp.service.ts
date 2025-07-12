import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OtpApiService } from '@ml-workspace/api-lib';
import type { ConfigType } from '@nestjs/config';
import { otpConfig } from '@ml-workspace/config';
import {
  CODE,
  Collection,
  createInAppSignature,
  createTokenSignature,
  DateFormat,
  getCurrentDate,
  InAppOtpDtoGetDetails,
  InAppOtpDtoValidate,
  InAppOtpResponseDto,
  MESSAGE,
} from '@ml-workspace/common';
import { generateOTP, generateSecret, verifyOTP } from '../common/otp/otplib';
import { FirebaseService } from '../common/firebase/firebase.service';
import { decryptAES, encryptAES } from '../common/utils/otp-encryption';

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

    const { iv, encrypted } = encryptAES(secret);

    const {
      deviceId,
      password,
      signature: dtoSignature,
      date,
      ...restData
    } = dto;

    const document = await this.firebaseService.createCollection(
      Collection.IN_APP,
      {
        request: {
          iv,
          ...restData,
          requestedAt: currentDate,
          secretKey: encrypted,
        },
      }
    );

    return {
      otp,
      id: document.id,
      code: CODE.SUCCESS,
      name: MESSAGE.SUCCESS,
      message: 'OTP successfully generated.',
    };
  }

  async verifyOtp(dto: InAppOtpDtoValidate) {
    const document = await this.firebaseService.getDocument(
      Collection.IN_APP,
      dto.id
    );

    if (document?.validate?.otpUsed) {
      throw new BadRequestException('OTP has already been used.');
    }

    const encryptedSecret = document?.request?.secretKey;
    const iv = document?.request?.iv;

    const secret = decryptAES(encryptedSecret, iv);

    const { isValid, isExpired, message } = verifyOTP(
      secret,
      dto.otp,
      dto.timeLimit
    );

    const currentTime = getCurrentDate(DateFormat.YMD_Hms);

    await this.firebaseService.updateDocument(Collection.IN_APP, dto.id, {
      validate: {
        isValid,
        message,
        isExpired,
        otpUsed: isValid && !isExpired ? true : false,
        validatedAt: currentTime,
      },
    });

    if (isExpired || !isValid) throw new BadRequestException(message);

    return {
      message,
      code: CODE.SUCCESS,
      name: MESSAGE.SUCCESS,
    };
  }

  async generateToken() {
    const apiKey = this.config.authApiKey;
    const secretKey = this.config.authSecretKey;

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
