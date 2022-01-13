import { ConfigDTO } from "../domain";
import { ConfigRepository } from "../repository";

export class ConfigService {
  constructor(private readonly configRepository: ConfigRepository) {}

  async getData() {
    const notionApiKey = await this.getKeyValue("NOTION_API_KEY");
    const notionDatabaseId = await this.getKeyValue("NOTION_DATABASE_ID");

    const req = await Promise.all([notionApiKey, notionDatabaseId]);

    const object = req.reduce((acc, item) => {
      if (!item) return acc;
      acc[item.key] = item.value;
      return acc;
    }, {});

    return object;
  }

  async getKeyValue(key: string) {
    return this.configRepository.getKeyValue(key);
  }

  async setKeyValue(data: ConfigDTO[]) {
    return this.configRepository.setKeyValue(data);
  }
}
