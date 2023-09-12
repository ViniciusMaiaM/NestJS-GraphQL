import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserArgs } from '../args/create-user.args';

@Resolver()
export class UserResolver {
  @Query(() => String)
  users() {
    return 'Hello World!';
  }

  @Mutation(() => String)
  createUser(@Args() args: CreateUserArgs) {
    console.log(args.data);
    return 'Usuário criado com sucesso';
  }
}
