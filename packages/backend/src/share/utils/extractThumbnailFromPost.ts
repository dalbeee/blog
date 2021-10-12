import { PostDTO } from '@src/post/dto/post.dto';

export const extractThumbnailFromPost = (post: PostDTO) =>
  post.content
    .match(/!\[.*?\]\((.*?\))/g)[0]
    .replace(/!\[.*?\]\((.*?)\)/, '$1');

export const regexSelectImage = /!\[.*?\]\((.*?)\)g/;
