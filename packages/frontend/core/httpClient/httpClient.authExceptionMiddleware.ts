import { AxiosInstance } from "axios";
import Router from "next/router";

import { useToastContext } from "../../store/toastContext";
import { AuthService } from "../service/authService";

export const httpClientAuthExceptionMiddleware = (axios: AxiosInstance) => {
  const toastAPI = useToastContext();
  const authAPI = new AuthService();

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 401) {
        authAPI.deleteToken();
        toastAPI.operation.push({
          title: "error",
          content: "로그인을 해주세요",
        });
        Router.push("/login");
      }
      return Promise.reject(err);
    }
  );

  return axios;
};
