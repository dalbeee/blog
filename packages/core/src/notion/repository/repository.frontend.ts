import { HttpClient } from "../../infrastructure/http/httpClient";
import { NotionPost } from "../useCase/types";
import { NotionRepository } from "./repository.interface";

export class FrontendRepository implements NotionRepository {
  constructor(private httpClient: HttpClient) {}

  async getPost(url: string): Promise<string> {
    return await this.httpClient.get(`/notion/${url}`);
  }

  async getPosts(): Promise<NotionPost[]> {
    return await this.httpClient.get(`/notion`);
  }
}
