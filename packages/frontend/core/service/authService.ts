import jwtDecode from "jwt-decode";

import { isServerSide } from "../../util/isServerSide";

interface TokenObject {
  email: string;
  role: Array<string>;
  iat: number;
  exp: number;
}
export class AuthService {
  localStorageKey = "t_";

  getToken() {
    return !isServerSide() && localStorage.getItem(this.localStorageKey);
  }

  setToken(data: string) {
    return !isServerSide() && localStorage.setItem(this.localStorageKey, data);
  }

  deleteToken() {
    return !isServerSide() && localStorage.removeItem(this.localStorageKey);
  }

  isExpiredToken() {
    const token = this.getToken();

    const decodedToken: TokenObject = jwtDecode(token);
    const result = decodedToken.exp - +new Date() / 1000;
    return result > 0 ? false : true;
  }
}
