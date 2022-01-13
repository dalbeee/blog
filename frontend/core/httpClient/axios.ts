import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpClientInterface } from "./httpClientInterface";

export class Axios implements HttpClientInterface {
  client: AxiosInstance;

  constructor(
    private readonly url: string,
    axiosConfig: AxiosRequestConfig = {}
  ) {
    const config: AxiosRequestConfig = {
      baseURL: this.url,
      ...axiosConfig,
    };

    const client = axios.create(config);
    this.client = client;

    client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        // console.log("response", error);
        // console.log("data", error.response.data);
        // devConsole("error from axios layer : ", error?.response);
        return Promise.reject(error.response);
      }
    );
  }
  get(url: string): Promise<any> {
    return this.client.get(url);
  }
  post(url: string, data: object): Promise<any> {
    return this.client.post(url, data);
  }

  patch(url: string, data: object): Promise<any> {
    return this.client.patch(url, data);
  }

  delete(url: string): Promise<any> {
    return this.client.delete(url);
  }

  use(middleware: Function) {
    middleware(this.client);
  }
}
