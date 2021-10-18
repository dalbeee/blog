import { AxiosInstance } from "axios";
import { getToken } from "../util/auth";

export const httpClientAuthHeaderMiddleware = (axios: AxiosInstance) => {
  const config = {
    // headers: { "access-control-allow-origin": "*" },
    Authorization: `Bearer ${getToken()}`,
  };

  axios.interceptors.request.use((res) => {
    res.headers = config;
    return res;
  });

  return axios;
};
