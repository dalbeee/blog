import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { User } from "@blog/core";

import { useUser } from "../../hooks/useUser";
import Custom403 from "../../pages/403";
import Loading from "../page/Loading";

const AuthRouter: any = ({ children, role }) => {
  const userAPI = useUser();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    userAPI.checkUserAuthenticate().then((r) => setUser(r));
  }, []);

  if (!user) return <Loading />;
  if (role && !user.roles?.includes(role)) return <Custom403 />;

  return <>{children}</>;
};

export default AuthRouter;
