import { AxiosInstance } from "axios";

import { coreAPI } from "../../coreAPI";
import { AuthService } from "../../service/authService";

export const authorizationTokenMiddleware = (axios: AxiosInstance) => {
  const auth = new AuthService();

  const headers = {
    "access-control-allow-origin": "*",
    Authorization: `Bearer ${auth.getToken()}`,
  };

  axios.interceptors.request.use((res) => {
    res.headers = headers;
    return res;
  });
};
