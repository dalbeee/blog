import { HttpClient } from "@blog/core/dist/infrastructure/http";
import { UserLoginDTO } from "../..";

export class UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async checkUserAuthenticate() {
    return await this.httpClient.get("/auth/validate");
  }

  async login(userDTO: UserLoginDTO) {
    return await this.httpClient.post(`/auth/login`, userDTO);
  }
}
