import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  acess_token: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
