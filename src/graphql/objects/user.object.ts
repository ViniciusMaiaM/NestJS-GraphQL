import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserObject {
  @Field()
  name: string;
  @Field()
  email: string;
}
