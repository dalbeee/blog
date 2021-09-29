export const slugify = (title: string) => {
  let result = title.trim().split(' ').join('-');
  result = result.replace(/\//g, '-');
  return result;
};
