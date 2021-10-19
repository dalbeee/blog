import { getHttpClient } from "../core/httpClient";
import { UserRepository } from "../core/repository/UserRepository";
import { userService } from "../core/service/UserService";

export const useUser = () => {
  const httpClient = getHttpClient();

  const userRepository = new UserRepository(httpClient);
  const service = userService(userRepository);

  return service;
};
