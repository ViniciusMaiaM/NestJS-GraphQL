import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  @IsString()
  access_token: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
