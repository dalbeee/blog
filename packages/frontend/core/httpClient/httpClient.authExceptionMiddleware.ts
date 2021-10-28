import { AxiosInstance } from "axios";
import Router from "next/router";
import { isServerSide } from "../../util/isServerSide";
import { coreAPI } from "../coreAPI";

import { AuthService } from "../service/authService";

export const httpClientAuthExceptionMiddleware = (axios: AxiosInstance) => {
  if (isServerSide) return;

  const core = coreAPI();
  const authAPI = new AuthService();

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 401) {
        authAPI.deleteToken();
        core.toast.warn("로그인이 필요합니다");
        err.handled = true;

        Router.push("/login");
      }
      return Promise.reject(err);
    }
  );

  return axios;
};
