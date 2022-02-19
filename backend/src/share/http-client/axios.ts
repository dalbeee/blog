import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HttpClient } from './http-client-interface';

export class Axios implements HttpClient {
  client: AxiosInstance;
  config: AxiosRequestConfig;

  constructor(
    private readonly url: string,
    axiosConfig: AxiosRequestConfig = {},
  ) {
    this.config = {
      baseURL: this.url,
      ...axiosConfig,
    };

    const client = axios.create();
    this.client = client;

    client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error.response);
      },
    );
  }
  get(url: string, options?: AxiosRequestConfig): Promise<any> {
    return this.client.get(url, { ...this.config, ...options });
  }
  post(url: string, data: object, options?: AxiosRequestConfig): Promise<any> {
    return this.client.post(url, data, { ...this.config, ...options });
  }

  patch(url: string, data: object, options?: AxiosRequestConfig): Promise<any> {
    return this.client.patch(url, data, { ...this.config, ...options });
  }

  delete(url: string, options?: AxiosRequestConfig): Promise<any> {
    return this.client.delete(url, { ...this.config, ...options });
  }

  use(middleware: Function) {
    middleware(this.client);
  }
}
