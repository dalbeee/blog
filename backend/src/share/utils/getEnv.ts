export const getEnv = (env: string): string => {
  const queryEnv = process.env[env];

  if (
    queryEnv === '' ||
    typeof queryEnv === null ||
    typeof queryEnv === 'undefined'
  )
    throw new Error(`process.env.${env} is not defined`);

  return queryEnv;
};
