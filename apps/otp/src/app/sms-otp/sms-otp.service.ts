import { OtpApiService } from '@ml-workspace/api-lib';
import {
  CODE,
  Collection,
  createInAppSignature,
  createTokenSignature,
  DateFormat,
  getCurrentDate,
  InAppOtpResponseDto,
  MESSAGE,
  SmsOtpRequestDto,
} from '@ml-workspace/common';
import { otpConfig } from '@ml-workspace/config';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { generateOTP, generateSecret, verifyOTP } from '../common/otp/otplib';
import { FirebaseService } from '../common/firebase/firebase.service';

@Injectable()
export class SmsOtpService {
  constructor(
    @Inject(otpConfig.KEY)
    private readonly config: ConfigType<typeof otpConfig>,
    private readonly otpApiService: OtpApiService,
    private readonly firebaseService: FirebaseService
  ) {}

  async requestSmsOtp(dto: SmsOtpRequestDto) {
    const { token } = await this.generateToken();

    // await this.otpApiService.validateDevice(
    //   dto.password,
    //   dto.mobileNumber,
    //   token
    // );

    const currentDate = getCurrentDate(DateFormat.YMD_Hms);
    // const signature = createInAppSignature(dto, this.config.otpSalt);

    // if (signature !== dto.signature) {
    //   throw new BadRequestException('Invalid signature...');
    // }

    // const secret = generateSecret();
    // const otp = generateOTP(secret, dto.timeLimit);

    // const {
    //   deviceId,
    //   password,
    //   signature: dtoSignature,
    //   date,
    //   ...restData
    // } = dto;

    const document = await this.firebaseService.createDocument(Collection.SMS, {
      request: { ...dto, requestedAt: currentDate },
    });

    return {
      code: CODE.SUCCESS,
      name: MESSAGE.SUCCESS,
      // OTP: otp,
      id: document.id,
      // token: signature,
      message: 'OTP successfully generated.',
      timelimit: dto.timeLimit.toString(),
    };
  }

  async validateSmsOtp(data: any) {
    return verifyOTP(data.otp, data.secret, data.timeLimit) as any;
  }

  async generateToken() {
    const apiKey = this.config.authApiKey;
    const secretKey = this.config.authSecretKey;

    const signature = await createTokenSignature(apiKey, secretKey);

    return this.otpApiService.generateToken(apiKey, signature);
  }
}
