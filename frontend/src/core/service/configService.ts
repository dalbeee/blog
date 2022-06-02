import fsAsync from "fs/promises";
import fs from "fs";

type ExportType = "JSON" | "ENV";

interface Props {
  configPath?: string;
  exportType?: ExportType | null;
}

export class ConfigService {
  private configPath: string;
  private exportType: ExportType;

  private data: { [key: string]: any };

  constructor({ configPath, exportType }: Props = {}) {
    if (exportType === null) {
      throw new Error('exportType must be "JSON" or "ENV"');
    }
    this.data = {};
    this.configPath = configPath;
    this.exportType = exportType;
    this.loadDataFromFile();
  }

  private loadDataFromFile() {
    let readFile;
    try {
      readFile = fs.readFileSync(this.configPath, "utf8");
    } catch (error) {
      return;
    }
    if (this.exportType === "JSON") {
      const readData = readFile && JSON.parse(readFile);
      Object.keys(readData).reduce((acc: Object, key: string): any => {
        this.data[key] = readData[key];
        return acc;
      }, this.data);
    } else if (this.exportType === "ENV") {
      readFile.split("\n").reduce((acc: Object, key: string): any => {
        const [keyName, keyValue] = key.split("=");
        this.data[keyName] = keyValue;
        return acc;
      }, this.data);
    }
  }

  private async persistData() {
    if (this.exportType === "ENV") {
      const data = Object.keys(this.data)
        .reduce((acc: any[], key: string) => {
          acc.push(`${key}=${this.data[key]}`);
          return acc;
        }, [])
        .join("\n");

      await fsAsync.writeFile(this.configPath, data);
    } else if (this.exportType === "JSON") {
      await fsAsync.writeFile(this.configPath, JSON.stringify(this.data));
    }
  }

  async set(key: string, value: any) {
    this.data[key] = value;

    await this.persistData();
    return this.data;
  }

  async getAll() {
    return this.data;
  }

  async get(key: string) {
    const data = this.data[key];
    if (!data) throw new Error("not found key");
    return data;
  }

  async remove(key: string) {
    delete this.data[key];

    await this.persistData();
  }
}

const configPath = "./data/config.json";
const exportType = "JSON";
export const configService = new ConfigService({ configPath, exportType });
