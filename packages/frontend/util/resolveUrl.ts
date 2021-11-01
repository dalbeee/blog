export const resolveUrl = () => {
  const result = `${process.env.NEXT_PUBLIC_HTTP_PROTOCOL}${process.env.NEXT_PUBLIC_LOCAL_HOST}:${process.env.NEXT_PUBLIC_LOCAL_HOST_PORT}`;
  return result;
};
