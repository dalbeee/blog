import { User } from "@blog/core/src/@types/user";
import { useRouter } from "next/router";

import { UserLoginDTO } from "../..";
import { UserRepository } from "../repository/UserRepository";

export const userService = (userRepository: UserRepository) => {
  const localStorageKey = "t_";
  const router = useRouter();

  const login = (userDTO: UserLoginDTO): Promise<boolean> => {
    const fn = async (): Promise<boolean> => {
      const response = await userRepository.login(userDTO);
      localStorage.setItem(localStorageKey, response.access_token);

      router.push("/");
      return true;
    };

    const result = fn();
    return result;
  };

  const checkUserAuthenticate = async (): Promise<User> => {
    return await userRepository.checkUserAuthenticate();
  };

  const logout = async (): Promise<boolean> => {
    localStorage.removeItem(localStorageKey);
    router.push("/");

    return true;
  };

  return { login, logout, checkUserAuthenticate };
};
