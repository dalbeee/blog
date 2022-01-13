import { CreatePostDTO } from '@blog/core/dist/domain';

export const extractThumbnailFromPost = (post: CreatePostDTO) =>
  post.content
    .match(/!\[.*?\]\((.*?\))/g)?.[0]
    .replace(/!\[.*?\]\((.*?)\)/, '$1') || null;

export const regexSelectImage = /!\[.*?\]\((.*?)\)g/;
