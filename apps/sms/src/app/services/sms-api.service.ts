import { URLS } from "@ml-workspace/api-lib";
import { MlClientApi } from "@ml-workspace/auth-lib";
import { SmsDto } from "@ml-workspace/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SmsApiService {
    constructor(
    private readonly mlClientApi: MlClientApi
    ) {}
    
    async sendSms(data: SmsDto, token: string, baseUrl: string): Promise<any> {
        const response =  await this.mlClientApi.sendRequest({
           data,
           method: 'POST',
           url: URLS.SEND_SMS,
           baseURL: baseUrl,
        }, token);

        return response.data; 
    }

    async generateToken(username: string, password: string, baseUrl: string): Promise<any> {
        const response = await this.mlClientApi.sendRequest({
          data: { username, password },
          method: 'POST',
          url: URLS.SMS_AUTH_LOGIN,
          baseURL: baseUrl,
        });

        return response.data;
    }

    async refreshToken(refreshToken: string, accessToken: string, baseUrl: string): Promise<any> {
        const response = await this.mlClientApi.sendRequest({
            data: { refreshToken },
            method: 'PUT',
            url: URLS.SMS_AUTH_REFRESH,
            baseURL: baseUrl,
        }, accessToken);

        return response.data;
    }
}