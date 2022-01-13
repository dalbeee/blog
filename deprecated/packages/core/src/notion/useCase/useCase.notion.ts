import { NotionRepository } from "../repository";
import { DatabaseQueryResult } from "../repository/types";
import { parseNotionPostToMarkdown } from "../util/parsePostToMarkdown";
import { NotionPost } from "./types";

export class NotionUseCase {
  constructor(private readonly repository: NotionRepository) {}

  async findPostFromServerToString(url: string): Promise<string> {
    const result = await this.repository.getPost(url);

    const parseMarkDown = parseNotionPostToMarkdown(result);
    return parseMarkDown;
  }

  async findPostsFromServer(databaseId: string): Promise<NotionPost[]> {
    const result: DatabaseQueryResult = await this.repository.getPosts(
      databaseId
    );

    const parseQueryResult = (query: DatabaseQueryResult): NotionPost[] => {
      const result = query.results.filter((item) => {
        return item.properties?.publishToBlog?.select?.name === "배포";
      });

      return result.map((result) => ({
        id: result.id,
        title: result.properties.이름.title?.[0]?.plain_text,
        url: result.url,
        createdAt: result.created_time,
        updatedAt: result.last_edited_time,
        publishToBlog: result.properties?.publishToBlog.select.name,
      }));
    };

    const parsed: NotionPost[] = parseQueryResult(result);
    return parsed;
  }

  async findImageUrlsFromRawContent(
    rowContent: string
  ): Promise<Array<string>> {
    const regex = /\[image\]\((.*)\)/g;

    const result = [...rowContent.matchAll(regex)];

    return result.map((item) => item[1]);
  }
}
