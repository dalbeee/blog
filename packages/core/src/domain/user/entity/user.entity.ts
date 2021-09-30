export class User {
  id: string;
  email: string;
  userName: string;
  password?: string;
  isValidate: boolean;
  isBlock: boolean;
  avatar: string | null;
}
