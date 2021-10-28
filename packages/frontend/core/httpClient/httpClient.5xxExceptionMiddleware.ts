import { AxiosInstance } from "axios";
import { useRouter } from "next/router";

import { isServerSide } from "../../util/isServerSide";

export const httpClient5xxExceptionMiddleware = (axios: AxiosInstance) => {
  if (isServerSide()) return;

  const router = useRouter();

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 503) {
        router.push("/503");
        err.handled = true;
      }
      if (err.status === 502) {
        router.push("/502");
        err.handled = true;
      }
      return Promise.reject(err);
    }
  );
};
