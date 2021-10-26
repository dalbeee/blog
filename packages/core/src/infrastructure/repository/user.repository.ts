import { UserLoginDTO } from "../../domain";
import { HttpClient } from "../http";

export class UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async checkUserAuthenticate() {
    return await this.httpClient.get("/auth/validate");
  }

  async login(userDTO: UserLoginDTO) {
    return await this.httpClient.post(`/auth/login`, userDTO);
  }
}
