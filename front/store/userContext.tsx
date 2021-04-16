import { createContext, useContext, useEffect, useState } from "react";
import {
  IUserLoginResult,
  IUserLoginResultError,
  IUserLoginResultSuccess,
} from "..";
import { useRouter } from "next/router";

const reducer = () => {
  // if (typeof window === "undefined") return null;

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

    window.localStorage.setItem(localStorageKey, userInfo.success.access_token);
    window.localStorage.setItem("username", userInfo.success.username);
    // TODO check
    // window.localStorage.setItem("email", userInfo.success.user.email);
    setUserInfo(userInfo.success);
    router.push("/");
  };

  const getLoginInfo = () => {
    try {
      const access_token = window.localStorage.getItem(localStorageKey);
      const username = window.localStorage.getItem("username");
      // const email = window.localStorage.getItem("email");

      const userInfo: IUserLoginResultSuccess = {
        access_token,
        username,
        // email,
      };
      setUserInfo(userInfo);
    } catch (error) {
      window.localStorage.removeItem(localStorageKey);
      window.localStorage.removeItem("username");

      setUserInfo(null);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(localStorageKey);
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("email");
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
