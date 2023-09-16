import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  async findAll(): Promise<UserEntity[]> {
    const user = new UserEntity();

    user.id = 'abc';
    user.name = 'Vinicius';
    user.email = 'vinicius@gmail.com';
    user.password = '123';

    return [user];
  }
}
