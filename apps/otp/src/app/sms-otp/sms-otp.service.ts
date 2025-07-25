import { OtpApiService } from '@ml-workspace/api-lib';
import {
  CODE,
  createTokenSignature,
  DateFormat,
  getCurrentDate,
  MESSAGE,
  MessageType,
  OTPCollection,
  SmsOtpRequestDto,
} from '@ml-workspace/common';
import { otpConfig } from '@ml-workspace/config';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { generateOTP, generateSecret, verifyOTP } from '../common/utils/otplib';
import { FirebaseService } from '../common/firebase/firebase.service';
import { decryptAES, encryptAES } from '../common/utils/otp-encryption';

@Injectable()
export class SmsOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService,
    private readonly firebaseService: FirebaseService
  ) {}

  async requestSmsOtp(dto: SmsOtpRequestDto) {
    const currentDate = getCurrentDate(DateFormat.YMD_Hms);

    const secret = generateSecret();
    const otp = generateOTP(secret);

    const message =
      'Your M.Lhuillier One-Time-Pin(OTP) is {otp}. Please do not share this with anyone, including to those who claim to be ML personnel.';

    const response = await this.otpApiService.sendSmsOTP({
      message,
      type: MessageType.SMS,
      mobileNumber: dto.mobileNumber,
      value: `otp=${otp}`,
    });

    const { iv, encrypted } = encryptAES(secret);

    const { password, message: dtoMessage, ...restData } = dto;

    const document = await this.firebaseService.createDocument(
      OTPCollection.SMS_OTP,
      {
        request: {
          iv,
          message,
          ...restData,
          requestedAt: currentDate,
          secretKey: encrypted,
          smsId: response.id,
          smsStatus: response.status,
        },
      }
    );

    return {
      id: document.id,
      code: CODE.SUCCESS,
      name: MESSAGE.SUCCESS,
      smsStatus: response.status,
      message: 'OTP successfully generated.',
    };
  }

  async verifySmsOtp(dto: any) {
    const document = await this.firebaseService.getDocument(
      OTPCollection.SMS_OTP,
      dto.id
    );

    if (document?.validate?.otpUsed) {
      throw new BadRequestException('OTP has already been used.');
    }

    const encryptedSecret = document?.request?.secretKey;
    const iv = document?.request?.iv;

    const secret = decryptAES(encryptedSecret, iv);

    const { isValid, isExpired, message } = verifyOTP(secret, dto.otp);

    const currentTime = getCurrentDate(DateFormat.YMD_Hms);

    await this.firebaseService.updateDocument(OTPCollection.SMS_OTP, dto.id, {
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
}
