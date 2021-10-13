import { CreatePostDTO } from '@src/post/dto/post.dto';

export const extractThumbnailFromPost = (post: CreatePostDTO) =>
  post.content
    .match(/!\[.*?\]\((.*?\))/g)?.[0]
    .replace(/!\[.*?\]\((.*?)\)/, '$1') || null;

export const regexSelectImage = /!\[.*?\]\((.*?)\)g/;
