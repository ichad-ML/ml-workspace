import { OtpApiService } from "@ml-workspace/api-lib";
import { otpConfig } from "@ml-workspace/config";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { FirebaseService } from "../common/firebase/firebase.service";
import {
  CODE,
  createInAppSignature,
  createTokenSignature,
  DateFormat,
  getCurrentDate,
  isSmsOTP,
  MESSAGE,
  MessageType,
  CollectionType,
  OtpRequestDto,
  OtpVerifyDto,
  OtpResponseDto,
  OtpVerifyResponseDto,
  CustomLoggerService,
} from '@ml-workspace/common';
import { generateOTP, generateSecret, verifyOTP } from '../common/utils/otplib';
import { decryptAES, encryptAES } from '../common/utils/otp-encryption';

@Injectable()
export class OtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService,
    private readonly firebaseService: FirebaseService,
    private readonly logger: CustomLoggerService
  ) {}

  async requestInAppOtp(
    dto: OtpRequestDto,
    collection: CollectionType
  ): Promise<OtpResponseDto> {
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

    let response;

    if (isSmsOTP(dto.otpType)) {
      response = await this.sendSmsOtp(otp, dto.mobileNumber);
    }

    const { iv, encrypted } = encryptAES(secret);

    const { signature: dtoSignature, ...restData } = dto;

    const document = await this.firebaseService.createDocument(collection, {
      request: {
        iv,
        ...restData,
        requestedAt: currentDate,
        secretKey: encrypted,
      },
    });

    return {
      otp,
      id: document.id,
      code: CODE.SUCCESS,
      name: MESSAGE.SUCCESS,
      message: 'OTP successfully generated.',
      smsStatus: response?.status,
    };
  }

  async verifyOtp(
    dto: OtpVerifyDto,
    collection: CollectionType
  ): Promise<OtpVerifyResponseDto> {
    const document = await this.firebaseService.getDocument(collection, dto.id);

    await this.validateData(document, dto);

    if (document?.validate?.otpUsed) {
      throw new BadRequestException('OTP has already been used.');
    }

    const encryptedSecret = document?.request?.secretKey;
    const iv = document?.request?.iv;

    const secret = decryptAES(encryptedSecret, iv);

    const { isValid, isExpired, message } = verifyOTP(
      secret,
      dto.pin,
      dto.timeLimit
    );

    const currentTime = getCurrentDate(DateFormat.YMD_Hms);

    await this.firebaseService.updateDocument(collection, dto.id, {
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

  private async sendSmsOtp(otp: string, mobileNumber: string) {
    const message =
      'Your M.Lhuillier One-Time-Pin(OTP) is {otp}. Please do not share this with anyone, including to those who claim to be ML personnel.';

    const response = await this.otpApiService.sendSmsOTP({
      message,
      mobileNumber,
      type: MessageType.SMS,
      value: `otp=${otp}`,
    });

    return response;
  }

  private async validateData(document: any, dto: OtpVerifyDto) {
    const { mobileNumber, deviceId, serviceType, timeLimit, otpType } =
      document.request;

    if (
      mobileNumber !== dto.mobileNumber ||
      deviceId !== dto.deviceId ||
      serviceType !== dto.serviceType ||
      timeLimit !== dto.timeLimit ||
      otpType !== dto.otpType
    ) {
      throw new BadRequestException(
        'OTP verification failed: Request parameters do not match'
      );
    }

    return;
  }
}