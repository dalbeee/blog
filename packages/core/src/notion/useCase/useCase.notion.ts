import { NotionRepository } from "../repository";
import { DatabaseQueryResult } from "../repository/types";
import { parseNotionPostToMarkdown } from "../util/parsePostToMarkdown";
import { NotionPost } from "./types";

export class NotionUseCase {
  constructor(private readonly repository: NotionRepository) {}

  async findPostFromServerToString(url: string): Promise<string> {
    let result;
    try {
      result = await this.repository.getPost(url);
    } catch (error) {
      throw error;
    }

    const parseMarkDown = parseNotionPostToMarkdown(result);
    return parseMarkDown;
  }

  async findPostsFromServer(databaseId: string): Promise<NotionPost[]> {
    const result: DatabaseQueryResult = await this.repository.getPosts(
      databaseId
    );

    const parseQueryResult = (query: DatabaseQueryResult): NotionPost[] => {
      return query.results.map((result) => ({
        id: result.id,
        title: result.properties.이름.title?.[0]?.plain_text,
        url: result.url,
        createdAt: result.created_time,
        updatedAt: result.last_edited_time,
      }));
    };

    const parsed: NotionPost[] = parseQueryResult(result);
    return parsed;
  }
}
