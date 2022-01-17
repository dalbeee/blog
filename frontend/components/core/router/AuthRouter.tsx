import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { useUser } from "../../../hooks/useUser";
import Http403 from "../../core/pages/Http403";
import SuspensePage from "../pages/SuspensePage";
import { coreAPI } from "../../../core/coreAPI";
import { User } from "../../../core/domain";

const AuthRouter: FC<{ role?: string }> = ({ children, role }) => {
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

  if (role && !user?.roles?.includes(role)) return <Http403 />;

  return <>{children}</>;
};

export default AuthRouter;
