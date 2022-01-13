import { Lexer } from 'marked';
import { EntityRepository, Repository } from 'typeorm';

import { CreatePostDTO } from '@blog/core/dist/domain';

import { extractThumbnailFromPost } from '@src/share/utils/extractThumbnailFromPost';
import { User } from '@src/user/entity/user.entity';
import { Post } from './entity/post.entity';
import * as helper from '@src/share/utils';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  parseContent(content: string, length?: number) {
    const markdownAst = new Lexer().lex(content);
    const parsedParagraph = markdownAst
      .filter((block: any) => block?.type === 'paragraph')
      .filter((block: any) => block?.tokens?.[0].type === 'text');

    const convertString = parsedParagraph.map((block: any) => block?.text);

    return length
      ? convertString.join(' ').substr(0, length)
      : convertString.join(' ');
  }

  createPost(user: User, post: CreatePostDTO) {
    const newPost = this.create(post);

    newPost.user = user;
    newPost.thumbnail = extractThumbnailFromPost(post) || null;
    newPost.description = this.parseContent(post.content, 100);
    newPost.slug = helper.slugify(post.title);
    return newPost;
  }
}
