import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useUser } from "../../../hooks/useUser";
import SuspensePage from "../pages/SuspensePage";
import { coreAPI } from "../../../core/coreAPI";
import { User } from "../../../core/domain";
import ErrorPage from "../pages/ErrorPage";

const AuthRouter = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: any;
}) => {
  const userAPI = useUser();
  const core = coreAPI();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [isFetched, setIsFetched] = useState(false);

  const [token, setToken] = useState<null | string>(null);

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

  if (!isFetched) return <SuspensePage />;

  if (role && !user?.roles?.includes(role)) return <ErrorPage status={403} />;

  return <>{children}</>;
};

export default AuthRouter;
