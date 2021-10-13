import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Cache } from 'cache-manager';

import { notion, infrastructure } from '@blog/core';
import { NotionPost } from '@blog/core/dist/notion/useCase/types';

@Injectable()
export class NotionService {
  notionAPI: notion.useCase.NotionUseCase;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    const url = 'https://api.notion.com/v1';
    const config: AxiosRequestConfig = {
      headers: {
        'Notion-Version': '2021-08-16',
        Authorization: `Bearer ${process.env.SECRET_NOTION}`,
      },
      withCredentials: true,
    };

    const httpClient = new infrastructure.Axios(url, config);
    const repository = new notion.repository.BackendRepository(httpClient);
    this.notionAPI = new notion.useCase.NotionUseCase(repository);
  }

  async getPost(url: string) {
    return await this.notionAPI.getPost(url);
  }

  async getPosts(): Promise<NotionPost[]> {
    return await this.notionAPI.getPosts(process.env.NOTION_DATABASE_ID);
  }
}
