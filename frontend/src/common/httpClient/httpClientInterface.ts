export interface HttpClientInterface {
  get: (url: string) => Promise<any>;
  post: (url: string, data: object) => Promise<any>;
  patch: (url: string, data: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
}
