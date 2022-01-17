import router from "next/router";

import { coreAPI } from "../core/coreAPI";
import { Role, User, UserDTO, UserLoginDTO } from "../core/domain";

export const useUser = () => {
  const core = coreAPI();

  const login = async (userDTO: UserLoginDTO): Promise<boolean> => {
    return await core.user
      .login(userDTO)
      .then(() => {
        core.toast.push("로그인에 성공하였습니다");

        router.push("/");
        return true;
      })
      .catch(() => {
        core.toast.error("로그인이 실패하였습니다");
        return false;
      });
  };

  const getAccessToken = (): string => {
    return core.user.getAccessToken();
  };

  const logout = async (): Promise<boolean> => {
    core.user.logout();

    core.toast.push("로그아웃 하였습니다");
    router.push("/");

    return true;
  };

  const decodeJWT = (): User | null => {
    return core.user.decodeJWT();
  };

  const isExpiredToken = (): boolean => {
    return core.user.isExpiredToken();
  };

  const firstSetting = async (user: UserDTO) => {
    return await core.user
      .createUser({ ...user, roles: [Role.Admin] })
      .then(() => {
        core.toast.push("사용자를 생성했습니다");
        core.config.setKeyValue([{ key: "IS_DONE_BLOG_SETTING", value: true }]);
        core.config.setKeyValue([
          { key: "ADMIN_USER_EMAIL", value: user.email },
        ]);
        router.push("/");
      })
      .catch((e) => {
        core.toast.error(`사용자 생성에 실패했습니다.\n${e?.message || ""}`);
      });
  };

  return {
    login,
    logout,
    getAccessToken,
    decodeJWT,
    isExpiredToken,
    firstSetting,
  };
};
