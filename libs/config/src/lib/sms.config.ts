import { ConfigModule, registerAs } from "@nestjs/config";
import Joi from "joi";
import { validateConfigSchema } from "./utils/schema.validator.util";

const schema = Joi.object({
    port: Joi.number(),

    smsBaseUrl: Joi.string().required(),
    smsUsername: Joi.string().required(),
    smsPassword: Joi.string().required(),
});

export default registerAs('smsConfig', async () => {
  await ConfigModule.envVariablesLoaded;

  const config = {
      port: process.env.PORT,

      smsBaseUrl: process.env.SMS_BASE_URL || '',
      smsUsername: process.env.SMS_USERNAME || '',
      smsPassword: process.env.SMS_PASSWORD || '',
  };

  validateConfigSchema('smsConfig', config, schema);

  return config;
});
