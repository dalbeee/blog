export interface HttpClient {
  get: (url: string) => Promise<any>;
  post: (url: string, data: object) => Promise<any>;
}
