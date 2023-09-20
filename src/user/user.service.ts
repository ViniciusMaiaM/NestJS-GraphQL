import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  // With the import on the userModule Nest can automatically creates a repository for the entity
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserInput);
    // Save is basically the insert into the database
    return this.userRepository.save(newUser);
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
}
