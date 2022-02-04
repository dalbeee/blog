import fs from "fs";

import { ConfigService } from "./configService";

let config: ConfigService;
let configPath = "./tempConfig.json";

beforeEach(async () => {
  config = new ConfigService({ configPath });
});

afterEach(async () => {
  try {
    fs.unlinkSync(configPath);
  } catch (error) {}
});

describe("configService", () => {
  describe("set method", () => {
    it("persistent", async () => {
      await config.set("key1", "value1");
      await config.set("key3", "value3");
      const newConfigInstance = new ConfigService({ configPath });
      const data = await newConfigInstance.getAll();

      expect(data).toEqual({ key1: "value1", key3: "value3" });
    });

    it("is apply immediately", async () => {
      await config.set("key1", "value1");
      const data = await config.getAll();
      await config.set("key3", "value3");

      expect(data).toEqual({ ...data, key3: "value3" });
    });
  });

  describe("get method", () => {
    it("if not find key throw Error", async () => {
      try {
        await config.get("key");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("find key return value", async () => {
      await config.set("key", "value");
      const data = await config.get("key");

      expect(data).toEqual("value");
    });
  });

  describe("remove method", () => {
    it("persistent", async () => {
      await config.set("key1", "value1");
      await config.remove("key1");
      const data = await config.getAll();

      expect(data).toEqual({});
    });
  });
});
