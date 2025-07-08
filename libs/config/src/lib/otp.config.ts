import { ConfigModule, registerAs } from "@nestjs/config";
import Joi from "joi";
import { validateConfigSchema } from "./utils/schema.validator.util";

const schema = Joi.object({
  port: Joi.number(),

  smsOtpBaseUrl: Joi.string(),
  inAppOtpBaseUrlGetDetails: Joi.string(),
  inAppOtpBaseUrlValidate: Joi.string(),
  validateDeviceUrl: Joi.string(),
  authServiceUrl: Joi.string(),

  otpSalt: Joi.string(),
  apiKey: Joi.string(),
  secretKey: Joi.string(),
});

export default registerAs('otpConfig', async () => {
  await ConfigModule.envVariablesLoaded;

  const config = {
    port: process.env.PORT,

    smsOtpBaseUrl: process.env.SMS_OTP_BASE_URL || '',
    inAppOtpBaseUrlGetDetails:
      process.env.IN_APP_OTP_BASE_URL_GET_DETAILS || '',
    inAppOtpBaseUrlValidate: process.env.IN_APP_OTP_BASE_URL_VALIDATE || '',
    validateDeviceUrl: process.env.VALIDATE_DEVICE_BASE_URL || '',
    authServiceUrl: process.env.AUTH_SERVICE_BASE_URL || '',

    otpSalt: process.env.OTP_SALT || '',
    apiKey: process.env.API_KEY || '',
    secretKey: process.env.SECRET_KEY || '',
  };

  validateConfigSchema('otpConfig', config, schema);

  return config;
});
