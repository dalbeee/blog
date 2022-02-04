import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@src/auth/decorator/role';
import { UpdateUserDTO } from './dto/user-update.dto';
import { UserDTO } from './dto/user.dto';

import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(private readonly userRepository: UserRepository) {}

  async findByName(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(
        { username },
        // { relations: ['posts', 'comments'] },
      );
    } catch (error) {
      throw new Error();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(
        { email },
        // { relations: ['posts', 'comments'] },
      );
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createUser(user: UserDTO): Promise<User> {
    try {
      const row = this.userRepository.create(user);
      row.roles = [Role.Admin];
      return await this.userRepository.save(row);
    } catch (error) {
      throw new ConflictException();
    }
  }

  async patchUser(user: User, updateUserDTO: UpdateUserDTO): Promise<any> {
    if (updateUserDTO?.email) {
      try {
        const findRow = await this.findByEmail(updateUserDTO.email);
        if (findRow) throw new ConflictException('email not available');
      } catch (error) {
        this.logger.log(error);
      }
    }

    if (updateUserDTO?.username) {
      const findRow = await this.findByName(updateUserDTO.username);
      if (findRow) throw new ConflictException('username not available');
    }

    try {
      const updateRow: User = Object.assign(user, updateUserDTO);
      return await this.userRepository.save(updateRow);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async deleteUser(email: string, user: User) {
    if (user.email !== email) throw new BadRequestException();
    const result = await this.userRepository.softDelete({ email });
    return result;
  }
}
