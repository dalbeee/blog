import { UserDTO, UserLoginDTO } from "../domain";
import { HttpClientInterface } from "../httpClient/httpClientInterface";

export class UserRepository {
  constructor(private readonly httpClient: HttpClientInterface) {}

  async checkUserAuthenticate() {
    return await this.httpClient.get("/auth/validate");
  }

  async login(userDTO: UserLoginDTO) {
    return await this.httpClient.post(`/auth/login`, userDTO);
  }

  async createUser(user: UserDTO) {
    return await this.httpClient.post(`/users`, user);
  }
}
