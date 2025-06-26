import { Injectable } from '@nestjs/common';
import { MlClientApi } from '@ml-workspace/auth-lib';

@Injectable()
export class OtpApiService {
  constructor(private readonly mlClientApi: MlClientApi) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getOtp(baseUrl: string): Promise<any> {
    const res = await this.mlClientApi.sendRequest({
      params: {},
      method: 'GET',
      url: `/posts`,
      baseURL: baseUrl,
    });
    return res.data;
  }
}
