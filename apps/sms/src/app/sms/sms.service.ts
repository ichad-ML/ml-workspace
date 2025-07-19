import { Inject, Injectable } from '@nestjs/common';
import { SmsDto, SmsOtpResponseDto } from '@ml-workspace/common';
import type { ConfigType } from '@nestjs/config';
import { smsConfig } from '@ml-workspace/config';
import { SmsApiService } from '../services/sms-api.service';
import { FirebaseService } from '../services/firebase.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class SmsService {
  constructor(
    @Inject(smsConfig.KEY)
    private readonly config: ConfigType<typeof smsConfig>,
    private readonly smsApiService: SmsApiService,
    private readonly firebaseService: FirebaseService,
    private readonly tokenService: TokenService
  ) {}

  async sendSms(dto: SmsDto): Promise<SmsOtpResponseDto> {
    const token = this.tokenService.getAccessToken();

    const data = {
      messageType: dto.type,
      text: dto.message,
      destination: dto.mobileNumber,
      keyValues: dto.value,
    } as unknown as SmsDto;

    return this.smsApiService.sendSms(data, token, this.config.smsBaseUrl);
  }
}
