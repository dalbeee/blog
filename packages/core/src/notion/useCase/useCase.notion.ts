import { NotionRepository } from "..";
import { parseNotionPostToMarkdown } from "../util/parsePostToMarkdown";
import { DatabaseQueryResult } from "./types";

export class NotionUseCase {
  constructor(private readonly repository: NotionRepository) {}

  async getPost(url: string) {
    const result = await this.repository.getPost(url);
    const parseMarkDown = parseNotionPostToMarkdown(result);
    return parseMarkDown;
  }

  async getPosts(databaseId: string) {
    const result = await this.repository.getPosts(databaseId);

    const parseQueryResult = (query: { results: DatabaseQueryResult[] }) => {
      return query.results.map((result) => ({
        id: result.id,
        title: result.properties.이름.title?.[0]?.plain_text,
        url: result.url,
      }));
    };

    const parsed = parseQueryResult(result);
    return parsed;
  }
}
