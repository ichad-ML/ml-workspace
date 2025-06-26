import axios, { AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MlClientApi {
  async sendRequest(config: AxiosRequestConfig): Promise<any> {
    const response = await axios.request(config);
    return response;
  }
}
