import { ConfigDTO } from "../domain";
import { NotionRepository } from "../repository";
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
    try {
      return await this.notionRepository.sync();
    } catch (error) {
      if (error.status === 403)
        throw Error(`\n입력한 정보가 정확하지 않습니다.`);
      throw error.data;
    }
  }

  async setKeyValue(data: ConfigDTO[]) {
    return await this.configService.setKeyValue(data);
  }

  async getKeyValue() {}

  async initVariables() {
    return await this.notionRepository.initVariables();
  }

  async activeStatus() {
    return await this.notionRepository.activeState();
  }
}
