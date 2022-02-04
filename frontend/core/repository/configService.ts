import fsAsync from "fs/promises";
import fs from "fs";

interface Props {
  configPath?: string;
}

export class ConfigService {
  private configPath: string;
  private data: { [key: string]: any };

  constructor({ configPath = "./config.json" }: Props = {}) {
    this.data = {};
    this.configPath = configPath;
    this.loadDataFromFile();
  }

  private loadDataFromFile() {
    let readFile;
    try {
      readFile = fs.readFileSync(this.configPath, "utf8");
    } catch (error) {
      return;
    }
    const readData = readFile && JSON.parse(readFile);
    Object.keys(readData).reduce((acc: Object, key: string): any => {
      this.data[key] = readData[key];
      return acc;
    }, this.data);
    return this.data;
  }

  private async persistData() {
    await fsAsync.writeFile(this.configPath, JSON.stringify(this.data));
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
    if (!data) throw new Error("error");
    return data;
  }

  async remove(key: string) {
    delete this.data[key];

    await this.persistData();
  }
}
