import { infrastructure } from "@blog/core";

import { httpClient5xxExceptionMiddleware } from "./httpClient.5xxExceptionMiddleware";
import { httpClientAuthExceptionMiddleware } from "./httpClient.authExceptionMiddleware";
import { httpClientAuthHeaderMiddleware } from "./httpClient.authHeaderMiddleware";
import { httpClientUncaughtExceptionMiddleware } from "./httpClient.uncatchedExceptionMiddleware";
import { isServerSide } from "../../util/isServerSide";

export const getHttpClient = () => {
  const url = isServerSide() ? process.env.API_PATH : "/api";

  const httpClient = new infrastructure.httpClient.Axios(url);

  httpClient.use(httpClientAuthHeaderMiddleware);
  httpClient.use(httpClient5xxExceptionMiddleware);
  httpClient.use(httpClientAuthExceptionMiddleware);
  httpClient.use(httpClientUncaughtExceptionMiddleware);

  return httpClient;
};
