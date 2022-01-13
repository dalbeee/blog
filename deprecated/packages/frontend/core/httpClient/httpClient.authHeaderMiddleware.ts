import { AxiosInstance } from "axios";

import { AuthService } from "../service/authService";

export const httpClientAuthHeaderMiddleware = (axios: AxiosInstance) => {
  const authAPI = new AuthService();

  const config = {
    // headers: { "access-control-allow-origin": "*" },
    Authorization: `Bearer ${authAPI.getToken()}`,
  };

  axios.interceptors.request.use((res) => {
    res.headers = config;
    return res;
  });

  return axios;
};
