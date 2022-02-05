import { configService } from "../core/service/configService";

export const hasBlogInstalled = async () => {
  try {
    return (await configService.get("IS_DONE_BLOG_SETTING")) && true;
  } catch (error) {
    return false;
  }
};

export const blogInstall = async () => {
  return await configService.set("IS_DONE_BLOG_SETTING", true);
};
