import { infrastructure } from "@blog/core";
import { isServerSide } from "../util/isServerSide";

import { httpClientAuthExceptionMiddleware } from "./httpClient.authExceptionMiddleware";
import { httpClientAuthHeaderMiddleware } from "./httpClient.authHeaderMiddleware";

export const getHttpClient = () => {
  const url = typeof window === "undefined" ? "http://backend:3000" : "/api";

  const httpClient = new infrastructure.httpClient.Axios(url);

  httpClient.use(httpClientAuthHeaderMiddleware);
  !isServerSide() && httpClient.use(httpClientAuthExceptionMiddleware);

  return httpClient;
};
