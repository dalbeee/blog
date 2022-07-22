import axios from "axios";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const dirPath = "./public/uploads";

export const fileGetter = (url: string) => {
  const filePath = `${process.env.NEXT_SSR_API_URL}/static/${url}`;
  return axios
    .get(filePath, {
      responseType: "arraybuffer",
    })
    .then(async (r) => {
      if (!existsSync(dirPath)) mkdirSync(dirPath);
      writeFileSync(`${dirPath}/${url}`, r.data as any, "utf-8");
      return;
    })
    .catch(() => {
      throw new Error(`save images failed >> ${filePath}`);
    });
};
