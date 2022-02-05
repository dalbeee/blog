import Axios, { AxiosInstance } from "axios";
import { HttpException } from "../../share/error";

export const uncaughtExceptionMiddleware = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (Axios.isAxiosError(err) && err instanceof HttpException === false) {
        console.error("httpClient > unhandled error", err);
      }
      throw err;
    }
  );
  // return axios;
};
