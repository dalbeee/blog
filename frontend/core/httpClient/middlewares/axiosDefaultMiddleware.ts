import { AxiosInstance } from "axios";

export const axiosDefaultMiddleware = (axios: AxiosInstance) => {
  axios.interceptors.response.use((response) => {
    return response.data;
  });
};
