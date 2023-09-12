import { ArgsType, Field } from '@nestjs/graphql';
import { CreateUserInput } from '../inputs/create-user.input';

@ArgsType()
export class CreateUserArgs {
  @Field()
  data: CreateUserInput;
}
