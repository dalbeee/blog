import { createContext, useContext, useEffect, useState } from "react";
import {
  IUserLoginResult,
  IUserLoginResultError,
  IUserLoginResultSuccess,
} from "..";
import { useRouter } from "next/router";
import { logger } from "../util/logger";
import { getUserInfo } from "../util/axios";

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
    const { isAuthenticated } = await getUserInfo(access_token);
    if (!isAuthenticated) {
      operation.logout();
      return false;
    }
    return true;
  };

  const login = (userInfo: IUserLoginResult) => {
    setError({} as IUserLoginResultError);
    if (userInfo?.error) return setError(userInfo.error);
    localStorage.setItem(localStorageKey, userInfo.success.access_token);
    localStorage.setItem("username", userInfo.success.username);

    setUserInfo(userInfo.success);
    router.push("/");
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
