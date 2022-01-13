export const isUuidString = (data: string) => {
  const regExp =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;
  return !!data.match(regExp);
};
