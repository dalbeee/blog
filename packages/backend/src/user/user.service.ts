import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByName(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(
        { username },
        // { relations: ['posts', 'comments'] },
      );
    } catch (error) {
      throw new NotFoundException();
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
      return await this.userRepository.save(row);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async deleteUser(email: string, user: User) {
    if (user.email !== email) throw new BadRequestException();

    try {
      const result = await this.userRepository.softDelete({ email });
      return result;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
