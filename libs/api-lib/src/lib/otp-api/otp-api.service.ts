import { Injectable } from '@nestjs/common';
import { MlClientApi } from '@ml-workspace/auth-lib';

@Injectable()
export class OtpApiService {
  constructor(private readonly mlClientApi: MlClientApi) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getOtp(data: any): Promise<any> {
    const response = await this.mlClientApi.sendRequest({
      data: data.data,
      method: data.method,
      url: data.url,
      baseURL: data.baseUrl,
    });
    return response.data;
  }

  async validateOtp(data: any): Promise<any> {
    const response = await this.mlClientApi.sendRequest({
      data: data.data,
      method: data.method,
      url: data.url,
      baseURL: data.baseUrl,
    });
    return response.data;
  }
}
