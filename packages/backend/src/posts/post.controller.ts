// import {
//   Body,
//   ClassSerializerInterceptor,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';

// import { CurrentUser } from '@src/auth/decorator/currentUser.decorator';
// import { User } from '@src/user/entity/user.entity';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { PostDTO } from './dto/post.dto';
// import { PostsService } from './post.service';

// @UseInterceptors(ClassSerializerInterceptor)
// @Controller('posts')
// export class PostsController {
//   constructor(private postsService: PostsService) {}

//   @Get()
//   getAll() {
//     return this.postsService.getAll();
//   }

//   @Get('/:id')
//   getById(@Param('id') id: string) {
//     return this.postsService.getById(id);
//   }

//   @Get('/slug/:slug')
//   getBySlug(@Param('slug') slug: string) {
//     return this.postsService.getBySlug(slug);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post()
//   createPost(@CurrentUser() user: User, @Body() post: PostDTO) {
//     return this.postsService.createPost(user, post);
//   }

//   // @UseGuards(JwtAuthGuard)
//   // @Delete(':id')
//   // deletePost(@Param('id') id: number) {
//   //   return this.postsService.deletePost(id);
//   // }

//   @UseGuards(JwtAuthGuard)
//   @Delete(':slug')
//   deletePostBySlug(@Param('slug') slug: string) {
//     return this.postsService.deletePostBySlug(slug);
//   }
// }
