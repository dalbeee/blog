export class AuthService {
  getToken() {
    return typeof window !== "undefined" && localStorage.getItem("t_");
  }
}
