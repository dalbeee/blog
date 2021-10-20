import { NotionRepository } from "@blog/core/dist/infrastructure/repository";
import { ConfigDTO } from "@blog/core/dist/domain";

import { ConfigService } from "./configService";

export class NotionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly notionRepository: NotionRepository
  ) {}

  async getConfigData() {
    const notionApiKey = await this.configService.getKeyValue("NOTION_API_KEY");
    const notionDatabaseId = await this.configService.getKeyValue(
      "NOTION_DATABASE_ID"
    );

    const req = await Promise.all([notionApiKey, notionDatabaseId]);

    const object = req.reduce((acc, item) => {
      if (!item) return acc;
      acc[item.key] = item.value;
      return acc;
    }, {});

    return object;
  }

  async sync() {
    return await this.notionRepository.sync();
  }

  async setKeyValue(data: ConfigDTO[]) {
    return await this.configService.setKeyValue(data);
  }

  async getKeyValue() {}
}
