import { ConfigModule, registerAs } from "@nestjs/config";
import Joi from "joi";
import { validateConfigSchema } from "./utils/schema.validator.util";

const schema = Joi.object({
  port: Joi.number(),
  smsOtpBaseUrl: Joi.string(),
  inAppOtpBaseUrl: Joi.string(),
});

export default registerAs('common', async () => {
  await ConfigModule.envVariablesLoaded;

  const config = {
    port: process.env.PORT,
    smsOtpBaseUrl: process.env.SMS_OTP_BASE_URL || '',
    inAppOtpBaseUrl: process.env.IN_APP_OTP_BASE_URL || '',
  };

  validateConfigSchema('common', config, schema);

  return config;
});
