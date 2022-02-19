export const getEnv = (env: string, defaultValue?: string): string => {
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
