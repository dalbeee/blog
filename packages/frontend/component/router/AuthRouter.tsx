import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { User } from "@blog/core";

import { useUser } from "../../hooks/useUser";
import Custom403 from "../../pages/403";
import Loading from "../page/Loading";

const AuthRouter: any = ({ children, role }) => {
  const userAPI = useUser();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [isFetched, setIsFetched] = useState(false);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = userAPI.getAccessToken();
    setToken(getToken);
    setUser(userAPI.decodeJWT());
    setIsFetched(true);
  }, []);

  useEffect(() => {
    if (isFetched && !token) {
      router.push("/login");
    }
  }, [isFetched]);

  if (!isFetched) return <Loading />;

  if (role && !user?.roles?.includes(role)) return <Custom403 />;

  return <>{children}</>;
};

export default AuthRouter;
