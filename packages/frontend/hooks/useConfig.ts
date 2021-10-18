import { infrastructure } from "@blog/core";

import { getHttpClient } from "../core/httpClient";

const useConfig = () => {
  const httpClient = getHttpClient();
  const configRepository = new infrastructure.repository.ConfigRepository(
    httpClient
  );

  return configRepository;
};

export default useConfig;
