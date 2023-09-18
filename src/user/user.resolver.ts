import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserEntity)
  getUser(@Args('id', { type: () => Int }) id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Query(() => [UserEntity])
  users(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserEntity)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserInput);
  }
}
