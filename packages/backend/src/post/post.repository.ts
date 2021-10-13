import { extractThumbnailFromPost } from '@src/share/utils/extractThumbnailFromPost';
import { User } from '@src/user/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDTO } from './dto/post.dto';
import { Post } from './entity/post.entity';
import * as helper from '@src/share/utils';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  createPost(user: User, post: CreatePostDTO) {
    const newPost = this.create(post);

    newPost.user = user;
    newPost.thumbnail = extractThumbnailFromPost(post) || null;
    newPost.description = helper.description(post.content) || '';
    newPost.slug = helper.slugify(post.title);
    return newPost;
  }
}
