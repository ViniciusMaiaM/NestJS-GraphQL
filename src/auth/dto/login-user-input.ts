import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginUserInput {
  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  password: UserEntity;
}
