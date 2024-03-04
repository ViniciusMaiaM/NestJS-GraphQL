import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserEntity)
  getUser(@Args('id', { type: () => Int }) id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Query(() => UserEntity)
  getUserEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<UserEntity> {
    return this.userService.findByEmail(email);
  }

  @Query(() => [UserEntity])
  @UseGuards(JwtAuthGuard)
  users(@Context() context): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserEntity)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserInput);
  }
}
