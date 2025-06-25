import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { OtpApiService2 } from './otp-api/otp-api.service';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { commonConfig } from '@ml-workspace/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConfig],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: async () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          transformOptions: {
            enableImplicitConversion: false,
          },
          exceptionFactory: (errors: ValidationError[]) => {
            for (const error of errors) {
              if (error.constraints?.isEnum) {
                error.constraints.isEnum = `${error.property} has an invalid value.`;
              }
            }

            return new ValidationPipe().createExceptionFactory()(errors);
          },
        }),
    },
    OtpApiService2,
  ],
  exports: [OtpApiService2],
})
export class CommonModule {}
