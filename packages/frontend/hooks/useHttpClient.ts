import { infrastructure } from "@blog/core";

const useHttpClient = () => {
  const axios = new infrastructure.httpClient.Axios(
    typeof window === "undefined" ? "http://backend:3000" : "/api"
  );

  return axios;
};
export default useHttpClient;
