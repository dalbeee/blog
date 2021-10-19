import { AxiosInstance } from "axios";

import { useToastContext } from "../store/toastContext";

import Router from "next/router";

export const httpClientAuthExceptionMiddleware = (axios: AxiosInstance) => {
  const toastAPI = useToastContext();

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 401) {
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
