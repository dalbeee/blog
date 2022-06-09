import * as dotenv from 'dotenv';

export const getEnv = (env: string, defaultValue?: string): string => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev')
    dotenv.config({ path: '.env.dev' });
  else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'stage')
    dotenv.config({ path: '.env.stage' });
  else if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'prod'
  )
    dotenv.config({ path: '.env.prod' });

  const queryEnv = process.env[env];

  if (
    queryEnv === '' ||
    typeof queryEnv === null ||
    typeof queryEnv === 'undefined'
  ) {
    if (!defaultValue) throw new Error(`process.env.${env} is not defined`);

    return defaultValue;
  }
  return queryEnv;
};
