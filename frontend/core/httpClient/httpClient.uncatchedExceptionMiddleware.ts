import { AxiosInstance } from "axios";

export const httpClientUncaughtExceptionMiddleware = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      !err?.handled &&
        console.log(
          "unhandled httpClient Error @from uncatchedExceptionMiddleware",
          err
        );
      // return Promise.reject(err);
      throw err;
    }
  );
};
