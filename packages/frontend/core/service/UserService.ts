import JwtDecode from "jwt-decode";
import { useRouter } from "next/router";

import { UserLoginDTO } from "@blog/core/dist/domain";
import { User } from "@blog/core/src/@types/user";

import { useToastContext } from "../../store/toastContext";
import { isServerSide } from "../../util/isServerSide";
import { UserRepository } from "../repository/UserRepository";

export const userService = (userRepository: UserRepository) => {
  const localStorageKey = "t_";
  const router = useRouter();
  const toastAPI = useToastContext();

  const login = async (userDTO: UserLoginDTO): Promise<boolean> => {
    const result = await userRepository.login(userDTO);
    localStorage.setItem(localStorageKey, result.access_token);
    router.push("/");

    return result;
  };

  const checkUserAuthenticate = async (): Promise<User> => {
    try {
      return await userRepository.checkUserAuthenticate();
    } catch (error) {
      toastAPI.operation.push({
        title: "알림",
        content: "로그인이 필요합니다",
      });
      router.push("/login");
    }
  };

  const getAccessToken = (): string => {
    return !isServerSide() && localStorage.getItem(localStorageKey);
  };

  const logout = async (): Promise<boolean> => {
    localStorage.removeItem(localStorageKey);
    router.push("/");

    return true;
  };

  const decodeJWT = (): User => {
    try {
      const token = getAccessToken();
      const result: User = JwtDecode(token);
      return result;
    } catch (error) {
      return null;
    }
  };

  return { login, logout, checkUserAuthenticate, getAccessToken, decodeJWT };
};
