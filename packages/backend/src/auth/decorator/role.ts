import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export const ROLES = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES, roles);
