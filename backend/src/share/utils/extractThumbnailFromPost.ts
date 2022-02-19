import { CreatePostDTO } from '@src/notion/domain/dto/create-post.dto';

export const extractThumbnailFromPost = (post: CreatePostDTO) =>
  post.content
    .match(/!\[.*?\]\((.*?\))/g)?.[0]
    .replace(/!\[.*?\]\((.*?)\)/, '$1');

export const regexSelectImage = /!\[.*?\]\((.*?)\)g/;
