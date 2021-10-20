import router from "next/router";

import { User, UserLoginDTO } from "@blog/core/dist/domain";

import { UserRepository } from "../core/repository/UserRepository";
import { UserService } from "../core/service/userService";
import { useToastContext } from "../store/toastContext";
import { getHttpClient } from "../core/httpClient/httpClient";

export const useUser = () => {
  const httpClient = getHttpClient();

  const userRepository = new UserRepository(httpClient);
  const service = new UserService(userRepository);

  const toastAPI = useToastContext();

  const login = async (userDTO: UserLoginDTO): Promise<boolean> => {
    const result = await service.login(userDTO);
    router.push("/");

    return result;
  };

  const checkUserAuthenticate = async (): Promise<User> => {
    try {
      return await service.checkUserAuthenticate();
    } catch (error) {
      toastAPI.operation.push({
        title: "알림",
        content: "로그인이 필요합니다",
      });
      router.push("/login");
    }
  };

  const getAccessToken = (): string => {
    return service.getAccessToken();
  };

  const logout = async (): Promise<boolean> => {
    await service.logout();
    router.push("/");

    return true;
  };

  const decodeJWT = (): User => {
    return service.decodeJWT();
  };

  return { login, logout, checkUserAuthenticate, getAccessToken, decodeJWT };
};
