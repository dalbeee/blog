import { NotionPost } from '@blog/core/dist/notion/useCase/types';
import { PostDTO } from '@src/post/dto/post.dto';
import { PostService } from '@src/post/post.service';
import { User } from '@src/user/entity/user.entity';
import { NotionService } from './notion.service';

export class CrawlerDatabase {
  constructor(
    private readonly postService: PostService,
    private readonly notionService: NotionService,
  ) {}

  async getDBService() {
    const dbResponse: NotionPost[] = await this.notionService.getPosts(
      process.env.NOTION_DATABASE_ID,
    );

    dbResponse.map(async (item) => {
      const notionPostToPost = (item: NotionPost): PostDTO => ({
        title: item.title,
        content: '',
        createdAt: item.createdAt as unknown as Date,
        updatedAt: item.updatedAt as unknown as Date,
      });

      const post = notionPostToPost(item);

      const result = await this.postService.createPost({} as User, post);
      console.log(result);
      return result;
    });
  }
}
