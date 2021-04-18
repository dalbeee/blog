import { useUserContext } from "../store/userContext";
import { getUserInfo } from "./axios";
import { logger } from "./logger";

export const isAuthenticated = (): boolean => {
  const { userInfo, operation } = useUserContext();
  let result = false;

  getUserInfo(userInfo.access_token)
    .then(() => {
      result = true;
      operation.logout();
    })
    .catch((error) => {
      logger("authvalidator error", error.message);
      result = false;
    });

  return result;
};
