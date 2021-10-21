import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { User } from "@blog/core";

import { useUser } from "../../hooks/useUser";
import Custom403 from "../../pages/403";
import Loading from "../page/Loading";
import { coreAPI } from "../../core/coreAPI";

const AuthRouter: FC<{ role?: string }> = ({ children, role }) => {
  const userAPI = useUser();
  const core = coreAPI();
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
    if (isFetched && (userAPI.isExpiredToken() || !token)) {
      core.user.logout();
      router.push("/login");
    }
  }, [isFetched]);

  if (!isFetched) return <Loading />;

  if (role && !user?.roles?.includes(role)) return <Custom403 />;

  return <>{children}</>;
};

export default AuthRouter;
