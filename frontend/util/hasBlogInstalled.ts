import { coreAPI } from "../core/coreAPI";

export const hasBlogInstalled = async () => {
  const core = coreAPI();

  return await core.config
    .getKeyValue("IS_DONE_BLOG_SETTING")
    .then((r) => !!r?.value)
    .catch((e) => e?.status > 500 && false);
};
