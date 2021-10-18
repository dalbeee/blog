import { AxiosInstance } from "axios";

import { useToastContext } from "../store/toastContext";

export const httpClientAuthExceptionMiddleware = (axios: AxiosInstance) => {
  const toastAPI = useToastContext();

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.statusCode === 401)
        toastAPI.operation.push({ title: "error", content: err.message });

      return false;
    }
  );

  return axios;
};
