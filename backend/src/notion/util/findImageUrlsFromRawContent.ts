export const findImageUrlsFromRawContent: (
  rowContent: string,
) => Promise<string[]> = async (rowContent) => {
  const regex = /\[image\]\((.*)\)/g;

  const result = [...rowContent.matchAll(regex)];

  return result.map((item) => item[1]);
};
