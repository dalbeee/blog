import { User, UserLoginDTO } from "@blog/core/dist/domain";
import { UserRepository } from "@blog/core/dist/infrastructure/repository";

import { AuthService } from "./authService";

export class UserService {
  authService = new AuthService();
  constructor(private readonly userRepository: UserRepository) {}

  async login(userDTO: UserLoginDTO): Promise<boolean> {
    try {
      const result = await this.userRepository.login(userDTO);
      this.authService.setToken(result.access_token);
      return true;
    } catch (error) {
      throw error;
    }
  }

  getAccessToken(): string {
    return this.authService.getToken();
  }

  logout(): void {
    this.authService.deleteToken();
  }

  decodeJWT(): User | null {
    const token = this.getAccessToken();
    return this.authService.decodeJWT(token);
  }

  isExpiredToken() {
    return this.authService.isExpiredToken();
  }
}
