import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}
  async create(createPostInput: CreatePostInput) {
    const newPost = this.postRepository.create(createPostInput);

    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  getUser(userId: number): Promise<UserEntity> {
    return this.userService.findOne(userId);
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return this.postRepository.update(id, updatePostInput);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
