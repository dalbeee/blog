import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// import { devConsole } from "@core/utils/devConsole";
import { HttpClient } from "./httpClient";

export class Axios implements HttpClient {
  client: AxiosInstance;

  constructor(private readonly url: string) {
    const config: Partial<AxiosRequestConfig> = {
      baseURL: this.url,
    };

    const client = axios.create(config);
    this.client = client;

    client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log("error from axios layer :", error.response);
        throw error.response.data;
      }
    );
  }
  get(url: string): Promise<any> {
    return this.client.get(url);
  }
  post(url: string, data: object): Promise<any> {
    return this.client.post(url, data);
  }
}
