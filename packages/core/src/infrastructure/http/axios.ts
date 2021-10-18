import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { devConsole } from "../..";
import { HttpClient } from "./httpClient";

export class Axios implements HttpClient {
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
        console.log(error);
        devConsole("error from axios layer : ", error?.response?.data);
        throw error.response?.data;
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
}
