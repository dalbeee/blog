export interface HttpClient {
  get: (url: string, options: unknown) => Promise<any>;
  post: (url: string, data: object, options: unknown) => Promise<any>;
  patch: (url: string, data: any, options: unknown) => Promise<any>;
  delete: (url: string, options: unknown) => Promise<any>;
}
