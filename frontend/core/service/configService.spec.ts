import fs from "fs";

import { ConfigService } from "./configService";

describe("configService with ENV", () => {
  let config: ConfigService;
  let configPath = "./tempConfig.env";

  it("null exportType throw Error", async () => {
    try {
      new ConfigService({ configPath });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe("configService with ENV", () => {
  let config: ConfigService;
  let configPath = "./data/tempConfig.env";
  beforeEach(async () => {
    config = new ConfigService({ configPath, exportType: "ENV" });
  });

  afterEach(async () => {
    try {
      fs.unlinkSync(configPath);
    } catch (error) {}
  });

  describe("set method", () => {
    it("persistent", async () => {
      await config.set("key1", "value1");
      await config.set("key3", "value3");
      const newConfigInstance = new ConfigService({
        configPath,
        exportType: "ENV",
      });
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

describe("configService with JSON", () => {
  let config: ConfigService;
  let configPath = "./tempConfig.json";

  beforeEach(async () => {
    config = new ConfigService({ configPath, exportType: "JSON" });
  });

  afterEach(async () => {
    try {
      fs.unlinkSync(configPath);
    } catch (error) {}
  });

  describe("set method", () => {
    it("persistent", async () => {
      await config.set("key1", "value1");
      await config.set("key3", "value3");
      const newConfigInstance = new ConfigService({
        configPath,
        exportType: "JSON",
      });
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
