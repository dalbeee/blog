import { AxiosInstance } from "axios";
import { HttpException } from "../../error";

export const uncaughtExceptionMiddleware = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err instanceof HttpException === false) {
        console.error("httpClient > unhandled error", err);
      }
      throw err;
    }
  );
};
