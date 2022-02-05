import Axios, { AxiosInstance } from "axios";
import {
  InternalServerErrorException,
  ServiceUnavailableException,
} from "../../share/error";

export const axiosDefaultMiddleware = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (!Axios.isAxiosError(error)) return;
      if (error.code === "ECONNREFUSED" || error.message === "Network Error")
        throw new ServiceUnavailableException(
          "connection error from http layer"
        );
      if (!error.response) throw new InternalServerErrorException();

      return Promise.reject(error);
    }
  );

  // return axios;
};
