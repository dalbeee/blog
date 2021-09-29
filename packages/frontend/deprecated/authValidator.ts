import { useUserContext } from "../store/userContext";
import { getUserInfo } from "./axios";
import { logger } from "./logger";

export const isAuthenticated = async (): Promise<boolean> => {
  // TODO useInfo.access_token 에서 값이 초기화전에 먼저 넘어오는 문제가 있음
  const { userInfo, operation } = useUserContext();
  const result = await getUserInfo(userInfo.access_token);
  logger(result);
  if (!result) {
    logger("authvalidator error");
    operation.logout();
    return false;
  }
  return true;
};
