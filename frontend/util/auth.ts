import { useUser } from "../hooks/useUser";

export const getToken = () => {
  // const userAPI = useUser();

  // return userAPI.getAccessToken();

  return typeof window !== "undefined" && localStorage.getItem("t_");
};
