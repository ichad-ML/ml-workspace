import { OtpApiService } from '@ml-workspace/api-lib';
import { otpConfig } from '@ml-workspace/config';
import { ConfigType } from '@nestjs/config';

export type Functions<T> = Partial<{
  [K in keyof T]: T[K];
}>;

export const mockOtpApiService: Functions<OtpApiService> = {
  async validateDevice<T>(): Promise<T> {
    return {} as T;
  },
};

export const mockOtpConfig = {
  port: 3000,
  smsOtpBaseUrl: '',
  inAppOtpBaseUrl: '',
} as unknown as ConfigType<typeof otpConfig>;
