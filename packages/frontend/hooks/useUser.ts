import router from "next/router";

import { User, UserLoginDTO } from "@blog/core/dist/domain";

import { coreAPI } from "../core/coreAPI";

export const useUser = () => {
  const core = coreAPI();

  const login = async (userDTO: UserLoginDTO): Promise<boolean> => {
    return await core.user
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
    return core.user.getAccessToken();
  };

  const logout = async (): Promise<boolean> => {
    core.user.logout();

    core.toast.push("로그아웃 하였습니다");
    router.push("/");

    return true;
  };

  const decodeJWT = (): User | null => {
    return core.user.decodeJWT();
  };

  const isExpiredToken = (): boolean => {
    return core.user.isExpiredToken();
  };

  return { login, logout, getAccessToken, decodeJWT, isExpiredToken };
};
