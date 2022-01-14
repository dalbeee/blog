import { resolveUrl } from "../../util/resolveUrl";
import { Axios } from "./axios";
import { httpClient5xxExceptionMiddleware } from "./httpClient.5xxExceptionMiddleware";
import { httpClientAuthExceptionMiddleware } from "./httpClient.authExceptionMiddleware";
import { httpClientAuthHeaderMiddleware } from "./httpClient.authHeaderMiddleware";
import { httpClientUncaughtExceptionMiddleware } from "./httpClient.uncatchedExceptionMiddleware";

export const getHttpClient = () => {
  const url = resolveUrl();

  const httpClient = new Axios(url);

  httpClient.use(httpClientAuthHeaderMiddleware);
  httpClient.use(httpClient5xxExceptionMiddleware);
  httpClient.use(httpClientAuthExceptionMiddleware);
  httpClient.use(httpClientUncaughtExceptionMiddleware);

  return httpClient;
};
