import { Inject, Injectable } from "@nestjs/common";
import {  commonConfig } from '@ml-workspace/config';
import type { ConfigType } from "@nestjs/config";
import { MlClientApi } from "@ml-workspace/auth-lib";

@Injectable()
export class OtpApiService {
  constructor(
    @Inject(commonConfig.KEY)
    private readonly config: ConfigType<typeof commonConfig>,
    @Inject(commonConfig.KEY)
    private readonly mlClientApi: MlClientApi
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getOtp(): Promise<any> {
    console.log('im here==>');
    const res = await this.mlClientApi.sendRequest({
      params: {},
      method: 'GET',
      url: `/posts`,
    });
    return res.data.data;
  }
}