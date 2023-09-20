import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';
import { ManyToOne, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @Field(() => UserEntity)
  user: UserEntity;
}
