import JwtDecode from "jwt-decode";
import { useRouter } from "next/router";

import { UserLoginDTO } from "@blog/core/dist/domain";
import { User } from "@blog/core/src/@types/user";

import { useToastContext } from "../../store/toastContext";
import { isServerSide } from "../../util/isServerSide";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  localStorageKey = "t_";
  router = useRouter();
  toastAPI = useToastContext();

  async login(userDTO: UserLoginDTO): Promise<boolean> {
    const result = await this.userRepository.login(userDTO);
    localStorage.setItem(this.localStorageKey, result.access_token);
    return result;
  }

  async checkUserAuthenticate(): Promise<User> {
    return await this.userRepository.checkUserAuthenticate();
  }

  getAccessToken(): string {
    return !isServerSide() && localStorage.getItem(this.localStorageKey);
  }

  async logout(): Promise<boolean> {
    localStorage.removeItem(this.localStorageKey);
    return true;
  }

  decodeJWT(): User {
    try {
      const token = this.getAccessToken();
      const result: User = JwtDecode(token);
      return result;
    } catch (error) {
      return null;
    }
  }
}
