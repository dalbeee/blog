import { createContext, useContext, useEffect, useState } from "react";
import {
  IUserLoginResult,
  IUserLoginResultError,
  IUserLoginResultSuccess,
} from "..";
import { useRouter } from "next/router";
import { logger } from "../util/logger";

const storageKey = (() => {
  const token = "access_token";
  const user = "username";

  return {
    essential: [token, user],
    optional: [],
  };
})();

const reducer = () => {
  const localStorageKey = "access_token";

  const router = useRouter();
  const [userInfo, setUserInfo] = useState<IUserLoginResultSuccess>(
    {} as IUserLoginResultSuccess
  );
  const [error, setError] = useState<IUserLoginResultError>(null);
  useEffect(() => {
    getLoginInfo();
  }, []);

  const login = (userInfo: IUserLoginResult) => {
    setError(null);
    if (userInfo?.error)
      return setError({
        message: userInfo.error.message,
        target: userInfo.error.target,
        isError: true,
      });
    logger(userInfo);
    localStorage.setItem(localStorageKey, userInfo.success.access_token);
    localStorage.setItem("username", userInfo.success.username);
    // TODO check
    // localStorage.setItem("email", userInfo.success.user.email);
    setUserInfo(userInfo.success);
    router.push("/");
  };

  const getLoginInfo = () => {
    try {
      const access_token = localStorage.getItem(localStorageKey);
      const username = localStorage.getItem("username");
      // const email = localStorage.getItem("email");

      const userInfo: IUserLoginResultSuccess = {
        access_token,
        username,
        // email,
      };
      setUserInfo(userInfo);
    } catch (error) {
      localStorage.removeItem(localStorageKey);
      localStorage.removeItem("username");

      setUserInfo(null);
    }
  };

  const logout = () => {
    localStorage.removeItem(localStorageKey);
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUserInfo({} as IUserLoginResultSuccess);
    router.push("/");
  };

  const operation = { login, getLoginInfo, logout };
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
