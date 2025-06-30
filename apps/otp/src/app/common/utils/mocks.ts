import { OtpApiService } from "@ml-workspace/api-lib";
import { Functions } from "@ml-workspace/common";
import { otpConfig } from "@ml-workspace/config";
import { ConfigType } from "@nestjs/config";

export const mockOtpApiService: Functions<OtpApiService> = {
  async getOtp<T>(): Promise<T> {
    return {} as T;
  },
};

export const mockOtpConfig = {
  port: 3000,
  smsOtpBaseUrl: '',
  inAppOtpBaseUrl: '',
} as unknown as ConfigType<typeof otpConfig>;
