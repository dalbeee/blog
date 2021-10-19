import { infrastructure } from "@blog/core";
import { isServerSide } from "../util/isServerSide";
import { httpClient5xxExceptionMiddleware } from "./httpClient.5xxExceptionMiddleware";

import { httpClientAuthExceptionMiddleware } from "./httpClient.authExceptionMiddleware";
import { httpClientAuthHeaderMiddleware } from "./httpClient.authHeaderMiddleware";
import { httpClientUncaughtExceptionMiddleware } from "./httpClient.uncatchedExceptionMiddleware";

export const getHttpClient = () => {
  const url = typeof window === "undefined" ? "http://nginx/api" : "/api";

  const httpClient = new infrastructure.httpClient.Axios(url);

  httpClient.use(httpClientAuthHeaderMiddleware);
  httpClient.use(httpClient5xxExceptionMiddleware);
  !isServerSide() && httpClient.use(httpClientAuthExceptionMiddleware);
  httpClient.use(httpClientUncaughtExceptionMiddleware);

  return httpClient;
};
