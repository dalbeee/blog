import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostDTO } from './dto/post.dto';
import { PostsService } from './post.service';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get('/getById/:id')
  getById(@Param('id') id: number) {
    return this.postsService.getById(id);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.postsService.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPost(@Req() req, @Body() post: PostDTO) {
    console.log('requser', req.user);
    return this.postsService.createPost(req.user, post);
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
}
