import { Module } from "@nestjs/common";
import { OtpApiService } from "./otp-api/otp-api.service";
import { ConfigModule } from "@nestjs/config";
import commonConfig from "../../config/common.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConfig],
    }),
  ],
  controllers: [],
  providers: [OtpApiService],
  exports: [OtpApiService],
})
export class CommonModule {
  // This module can be used to provide common services, utilities, or configurations
  // that can be shared across different modules in the application.
}