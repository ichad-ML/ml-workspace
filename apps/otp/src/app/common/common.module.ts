import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { OtpApiService } from './otp-api/otp-api.service';
import { ConfigModule } from '@nestjs/config';
import commonConfig from '../../config/common.config';
import { APP_PIPE } from '@nestjs/core';

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
    OtpApiService,
  ],
  exports: [OtpApiService],
})
export class CommonModule {}
