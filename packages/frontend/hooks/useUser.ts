import router from "next/router";

import { User, UserLoginDTO } from "@blog/core/dist/domain";

import { UserRepository } from "../core/repository/UserRepository";
import { UserService } from "../core/service/userService";
import { getHttpClient } from "../core/httpClient/httpClient";
import { coreAPI } from "../core/coreAPI";

export const useUser = () => {
  const httpClient = getHttpClient();

  const userRepository = new UserRepository(httpClient);
  const service = new UserService(userRepository);

  const core = coreAPI();

  const login = async (userDTO: UserLoginDTO): Promise<boolean> => {
    return await service
      .login(userDTO)
      .then(() => {
        core.toast.push("로그인에 성공하였습니다");

        router.push("/");
        return true;
      })
      .catch(() => {
        core.toast.error("로그인이 실패하였습니다");
        return false;
      });
  };

  const getAccessToken = (): string => {
    return service.getAccessToken();
  };

  const logout = async (): Promise<boolean> => {
    service.logout();

    core.toast.push("로그아웃 하였습니다");
    router.push("/");

    return true;
  };

  const decodeJWT = (): User | null => {
    return service.decodeJWT();
  };

  const isExpiredToken = (): boolean => {
    return service.isExpiredToken();
  };

  return { login, logout, getAccessToken, decodeJWT, isExpiredToken };
};
