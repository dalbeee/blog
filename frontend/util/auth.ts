export const getToken = () =>
  typeof window !== "undefined" && localStorage.getItem("access_token");
