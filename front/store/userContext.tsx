import { createContext, useContext, useEffect, useState } from "react";
import { IUserInfo } from "..";
import { useRouter } from "next/router";

const reducer = () => {
  // if (typeof window === "undefined") return null;

  const localStorageKey = "access_token";

  const router = useRouter();
  const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo);

  useEffect(() => {
    getLoginInfo();
  }, []);

  const login = (userInfo: IUserInfo) => {
    window.localStorage.setItem(localStorageKey, userInfo.access_token);
    window.localStorage.setItem("username", userInfo.username);
    // TODO check
    // window.localStorage.setItem("email", userInfo.user.email);
    setUserInfo(userInfo);
    router.push("/");
  };

  const getLoginInfo = () => {
    const access_token = window.localStorage.getItem(localStorageKey);
    const username = window.localStorage.getItem("username");
    // const email = window.localStorage.getItem("email");

    const userInfo: IUserInfo = {
      access_token,
      username,
      // email,
    };
    setUserInfo(userInfo);
  };

  const logout = () => {
    window.localStorage.removeItem(localStorageKey);
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("email");
    setUserInfo({} as IUserInfo);
    router.push("/");
  };

  const operation = { login, getLoginInfo, logout };
  return { userInfo, operation };
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
