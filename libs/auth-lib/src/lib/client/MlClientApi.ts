import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MlClientApi {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com', // Replace with actual base URL
      timeout: 5000,
    });
  }

    async sendRequest(config: AxiosRequestConfig): Promise<any> {
      console.log("im here 2==>")
      const response = await this.httpClient.request(config);
      console.log("res=>", response)
      return response;
  }
}
