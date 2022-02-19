export interface HttpClient {
  get: (url: string, options: any) => Promise<any>;
  post: (url: string, data: object, options: any) => Promise<any>;
  patch: (url: string, data: any, options: any) => Promise<any>;
  delete: (url: string, options: any) => Promise<any>;
}
