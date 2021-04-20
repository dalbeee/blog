import { createContext, useContext, useEffect, useState } from "react";
import {
  IUserLoginResultError,
  IUserLoginResultSuccess,
  UserLoginDTO,
} from "..";
import { useRouter } from "next/router";
import { logger } from "../util/logger";
import { checkUserAuthenticated, login as axiosLogin } from "../util/axios";

const storageKey = {
  access_token: "access_token",
  username: "username",
};

const reducer = () => {
  const localStorageKey = "access_token";

  const router = useRouter();
  const [userInfo, setUserInfo] = useState<IUserLoginResultSuccess>(
    {} as IUserLoginResultSuccess
  );
  const [error, setError] = useState<IUserLoginResultError>(
    {} as IUserLoginResultError
  );
  useEffect(() => {
    getLoginInfo();
  }, []);

  const isAuthenticated = async (): Promise<boolean> => {
    // TODO useInfo.access_token 에서 값이 초기화전에 먼저 넘어오는 문제가 있음

    const access_token = localStorage.getItem(localStorageKey);
    const { isAuthenticated } = await checkUserAuthenticated(access_token);
    if (!isAuthenticated) {
      operation.logout();
      return false;
    }
    return true;
  };

  const login = (userInfo: UserLoginDTO): Promise<boolean> => {
    setError({} as IUserLoginResultError);

    const fn = async (): Promise<boolean> => {
      const result = await axiosLogin(userInfo);
      if (result?.error) {
        setError(result.error);
        return false;
      }
      localStorage.setItem(localStorageKey, result.success.access_token);
      localStorage.setItem("username", result.success.username);
      setUserInfo(result.success);
      router.push("/");
      return true;
    };

    const result = fn();
    return result;
  };

  const getLoginInfo = () => {
    try {
      const access_token = localStorage.getItem(localStorageKey);
      const username = localStorage.getItem("username");

      const userInfo: IUserLoginResultSuccess = {
        access_token,
        username,
      };
      setUserInfo(userInfo);
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem("username");
    setUserInfo({} as IUserLoginResultSuccess);
    router.push("/");
  };

  const operation = { login, getLoginInfo, logout, isAuthenticated };
  return { userInfo, error, operation };
};

type Reducer = ReturnType<typeof reducer>;

const UserContext = createContext<Reducer | null>({} as Reducer);

export const UserContextProvider = ({ children }) => {
  const hooks = reducer();
  return <UserContext.Provider value={hooks}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!Object.keys(context).length) {
    throw Error("not implement UserContext provider");
  }
  return context;
};
