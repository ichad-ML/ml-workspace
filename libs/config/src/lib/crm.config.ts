import { ConfigModule, registerAs } from "@nestjs/config";
import Joi from "joi";
import { validateConfigSchema } from "./utils/schema.validator.util";

const schema = Joi.object({
    port: Joi.number(),
    crmTestBaseUrl: Joi.string(),
});

export default registerAs('crmConfig', async () => {
  await ConfigModule.envVariablesLoaded;

  const config = {
      port: process.env.PORT,
      crmTestBaseUrl: process.env.CRM_TEST_BASE_URL || '',
  };

  validateConfigSchema('crmConfig', config, schema);

  return config;
});
