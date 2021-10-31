import { infrastructure } from "@blog/core";
import { isServerSide } from "../../util/isServerSide";

import { httpClient5xxExceptionMiddleware } from "./httpClient.5xxExceptionMiddleware";
import { httpClientAuthExceptionMiddleware } from "./httpClient.authExceptionMiddleware";
import { httpClientAuthHeaderMiddleware } from "./httpClient.authHeaderMiddleware";
import { httpClientUncaughtExceptionMiddleware } from "./httpClient.uncatchedExceptionMiddleware";

export const getHttpClient = () => {
  const url = isServerSide()
    ? process.env.SSR_API_URL
    : process.env.NEXT_PUBLIC_API_URL || "/api";

  const httpClient = new infrastructure.httpClient.Axios(url);

  httpClient.use(httpClientAuthHeaderMiddleware);
  httpClient.use(httpClient5xxExceptionMiddleware);
  httpClient.use(httpClientAuthExceptionMiddleware);
  httpClient.use(httpClientUncaughtExceptionMiddleware);

  return httpClient;
};
