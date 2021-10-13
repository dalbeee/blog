import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CurrentUser } from '@src/auth/decorator/currentUser.decorator';
import { JwtAuthGuard } from '@src/auth/guard/jwtAuth.guard';
import { User } from '@src/user/entity/user.entity';
import { CreatePostDTO, PostDTO } from './dto/post.dto';
import { PostService } from './post.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('posts')
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
  createPost(@CurrentUser() user: User, @Body() post: PostDTO) {
    return this.postsService.createPost(user, post);
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // deletePost(@Param('id') id: number) {
  //   return this.postsService.deletePost(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  deletePostBySlug(@Param('slug') slug: string) {
    return this.postsService.deletePostBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test(@Body() post: CreatePostDTO, @CurrentUser() user: User) {
    return await this.postsService.test(user, post);
  }
}
