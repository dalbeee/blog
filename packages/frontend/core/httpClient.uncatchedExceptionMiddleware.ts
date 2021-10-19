import { AxiosInstance } from "axios";

import { devConsole } from "@blog/core";

export const httpClientUncaughtExceptionMiddleware = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      devConsole("unhandled httpClient Error", err);
      // return Promise.reject(err);
      return;
    }
  );
};
