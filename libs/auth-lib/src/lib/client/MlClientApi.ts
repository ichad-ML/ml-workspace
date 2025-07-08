import axios, { AxiosRequestConfig } from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MlClientApi {
  async sendRequest(config: AxiosRequestConfig, token?: string): Promise<any> {
    console.log('Config===>', config);

    // Add token to headers if provided
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

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
