export interface RepositoryInterface {
  getPost(url: string): Promise<any>;
  getPosts(url: string): Promise<any>;
}
