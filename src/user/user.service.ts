import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // With the import on the userModule Nest can automatically creates a repository for the entity
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserInput);
    // Save is basically the insert into the database

    const password = await bcrypt.hash(createUserInput.password, 10);
    return this.userRepository.save({
      ...newUser,
      password,
    });
  }
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where: {
        email,
      },
    });
  }
}
