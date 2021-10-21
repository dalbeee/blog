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
    return await service
      .login(userDTO)
      .then(() => {
        toastAPI.operation.push({
          title: "알림",
          content: "로그인에 성공하였습니다",
        });
        router.push("/");
        return true;
      })
      .catch(() => {
        toastAPI.operation.push({
          title: "알림",
          content: "로그인에 실패하였습니다",
        });
        return false;
      });
  };

  const getAccessToken = (): string => {
    return service.getAccessToken();
  };

  const logout = async (): Promise<boolean> => {
    service.logout();

    toastAPI.operation.push({
      title: "알림",
      content: "로그아웃에 성공하였습니다",
    });
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
