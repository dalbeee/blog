import { User, UserDTO, UserLoginDTO } from "../domain";
import { UserRepository } from "../repository";
import { AuthService } from "./authService";
import { ValidationService } from "./validationService";

export class UserService {
  authService = new AuthService();
  validationService = new ValidationService();
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

  async createUser(user: UserDTO) {
    try {
      const result = await this.validationService.validate(new UserDTO(), user);
      return await this.userRepository.createUser(result);
    } catch (error) {
      throw error;
    }
  }
}
