import axios, { AxiosRequestConfig } from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MlClientApi {
  async sendRequest(config: AxiosRequestConfig): Promise<any> {
    console.log('Config===>', config);
    try {
      const response = await axios.request(config);
      return response;
    } catch (error: any) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      }
      throw new BadRequestException(error.message);
    }
  }
}
