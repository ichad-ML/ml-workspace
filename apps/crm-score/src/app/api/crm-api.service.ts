import { MlClientApi } from "@ml-workspace/auth-lib";
import { crmConfig } from "@ml-workspace/config";
import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class CrmApiService {
    constructor(
        @Inject(crmConfig.KEY)
        private readonly config: ConfigType<typeof crmConfig>,
        private readonly mlClientApi: MlClientApi) { }
    
    async getData() {
        const response = await this.mlClientApi.sendRequest({
            method: 'GET',
            url: '/users',
            baseURL: this.config.crmTestBaseUrl
        });
        
        return response.data
    }
}