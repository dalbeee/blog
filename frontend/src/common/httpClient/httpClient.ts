import { resolveUrl } from "../../util/resolveUrl";
import { Axios } from "./axios";
import {
  axiosDefaultMiddleware,
  responseErrorMiddleware,
  uncaughtExceptionMiddleware,
} from "./middlewares";

export const getHttpClient = () => {
  const url = resolveUrl();

  const httpClient = new Axios(url);

  httpClient.use(axiosDefaultMiddleware);
  httpClient.use(responseErrorMiddleware);
  httpClient.use(uncaughtExceptionMiddleware);

  return httpClient;
};
