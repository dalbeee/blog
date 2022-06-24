import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from '@src/auth/decorator/role';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/user-update.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByName(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
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
        const result = await this.findByEmail(updateUserDTO.email);
        if (result) throw new ConflictException('email not available');
      } catch (error) {}
    }

    if (updateUserDTO?.username) {
      try {
        const result = await this.findByName(updateUserDTO.username);
        if (result) throw new ConflictException('username not available');
      } catch (error) {}
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
