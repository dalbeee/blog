import { infrastructure } from "@blog/core";

const useConfig = () => {
  const url = typeof window === "undefined" ? "http://backend:3000" : "/api";
  const httpClient = new infrastructure.httpClient.Axios(url);
  const configRepository = new infrastructure.repository.ConfigRepository(
    httpClient
  );

  return configRepository;
};

export default useConfig;
