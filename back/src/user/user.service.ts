import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './User.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log('error from user > findAll', error.message);

      throw new Error(error.message);
    }
  }

  async findByName(username: string): Promise<any> {
    try {
      return await this.userRepository.findOne(
        { username },
        { relations: ['posts', 'comments'] },
      );
    } catch (error) {
      console.log('error from user > findByName', error.message);

      throw Error(error.message);
    }
  }

  async createUser(user: UserDTO): Promise<any> {
    try {
      const newUser = await this.userRepository.save(user);
      console.log(newUser);
      return newUser;
    } catch (error) {
      const message = [];
      console.log('error from user > createUser', error.message);

      if (error instanceof QueryFailedError)
        message.push({ code: 401, message: 'duplicate' });
      throw new HttpException({ error: message }, HttpStatus.CONFLICT);
    }
  }

  // TODO 마무리
  async deleteUser({ username }: UserDTO) {
    try {
      const userData = await this.userRepository.findOne({ username });

      userData.posts = null;
      const result = await this.userRepository.save(userData);
      console.log(result);

      return await this.userRepository.delete({ username });
    } catch (error) {
      console.log('error from user > deleteUser', error.message);

      throw new Error(error.message);
    }
  }
}
