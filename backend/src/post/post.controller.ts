import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CurrentUser } from '@src/auth/decorator/currentUser.decorator';
import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { CreatePostDTO } from '@src/notion/domain/dto/create-post.dto';
import { PatchPostDTO } from '@src/notion/domain/dto/patch-post.dto';
import { User } from '@src/user/entity/user.entity';
import { PostService } from './post.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/posts')
export class PostController {
  constructor(private postsService: PostService) {}

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.postsService.getById(id);
  }

  @Get('/slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.postsService.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@CurrentUser() user: User, @Body() post: CreatePostDTO) {
    return this.postsService.createPost(user, post);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:postId')
  async patchPost(
    @Param('postId') postId: string,
    @Body() updatePostDTO: PatchPostDTO,
    @CurrentUser() user: User,
  ) {
    return await this.postsService.patchPost(user, postId, updatePostDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  deletePostBySlug(@Param('slug') slug: string) {
    return this.postsService.deletePostBySlug(slug);
  }
}
