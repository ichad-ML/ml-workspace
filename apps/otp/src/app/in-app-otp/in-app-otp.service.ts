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
  InAppOtpResponseDto,
  InAppOtpValidateDto,
  MESSAGE,
  CollectionType,
} from '@ml-workspace/common';
import { generateOTP, generateSecret, verifyOTP } from '../common/utils/otplib';
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

    const document = await this.firebaseService.createDocument(
      CollectionType.IN_APP_OTP,
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

  async verifyOtp(dto: InAppOtpValidateDto) {
    const document = await this.firebaseService.getDocument(
      CollectionType.IN_APP_OTP,
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

    await this.firebaseService.updateDocument(
      CollectionType.IN_APP_OTP,
      dto.id,
      {
        validate: {
          isValid,
          message,
          isExpired,
          otpUsed: isValid && !isExpired ? true : false,
          validatedAt: currentTime,
        },
      }
    );

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
}
