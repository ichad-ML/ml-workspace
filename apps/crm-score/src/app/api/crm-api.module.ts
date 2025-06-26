import { Module } from "@nestjs/common";
import { CrmApiService } from "./crm-api.service";
import { MlClientApi } from "@ml-workspace/auth-lib";

@Module({
    imports: [],
    controllers: [],
    providers: [CrmApiService, MlClientApi],
    exports: [CrmApiService, MlClientApi],
})
export class CrmApiModule {}