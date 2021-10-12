export interface NotionRepository {
  getPost(url: string): Promise<any>;
  getPosts(databaseId?: string): Promise<any>;
}
