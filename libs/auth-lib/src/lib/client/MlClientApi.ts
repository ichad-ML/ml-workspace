import axios, { AxiosRequestConfig } from 'axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MlClientApi {
  private readonly logger = new Logger(MlClientApi.name);
  async sendRequest(config: AxiosRequestConfig, token?: string): Promise<any> {
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    this.logger.log(`\nConfig: ${JSON.stringify(config, null, 2)}`);

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        this.logger.error('Server responded with an error:', error.response.data);
        this.logger.error('Status:', error.response.status);
        this.logger.error('Headers:', error.response.headers);
      }
      throw new BadRequestException(error.message);
    }
  }
}
