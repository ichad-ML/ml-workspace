import { validateConfigSchema } from "@ml-workspace/common";
import { ConfigModule, registerAs } from "@nestjs/config";
import Joi from "joi";

const schema = Joi.object({
  port: Joi.number(),
});

export default registerAs('common', async () => {
  await ConfigModule.envVariablesLoaded;

  const config = {
    port: process.env.PORT,
  };

  validateConfigSchema('common', config, schema);

  return config;
});

