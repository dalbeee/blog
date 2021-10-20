import { BaseEntity } from "../../base.entity";

export class User extends BaseEntity {
  email: string;
  username: string;
  roles: string[];
}
