import { resolveUrl } from "../../util/resolveUrl";
import { Axios } from "./axios";
import {
  axiosDefaultMiddleware,
  authorizationTokenMiddleware,
  responseErrorMiddleware,
  uncaughtExceptionMiddleware,
} from "./middlewares";

export const getHttpClient = () => {
  const url = resolveUrl();

  const httpClient = new Axios(url);

  httpClient.use(axiosDefaultMiddleware);
  httpClient.use(authorizationTokenMiddleware);
  httpClient.use(responseErrorMiddleware);
  httpClient.use(uncaughtExceptionMiddleware);

  return httpClient;
};
