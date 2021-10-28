import { AxiosInstance } from "axios";
import Router from "next/router";

import { isServerSide } from "../../util/isServerSide";
import { AuthService } from "../service/authService";
import { ToastService } from "../service/toastService";

export const httpClientAuthExceptionMiddleware = (axios: AxiosInstance) => {
  if (isServerSide()) return;

  const toastAPI = new ToastService();
  const authAPI = new AuthService();

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 401) {
        authAPI.deleteToken();
        toastAPI.warn("로그인이 필요합니다");
        err.handled = true;

        Router.push("/login");
      }
      return Promise.reject(err);
    }
  );

  return axios;
};
