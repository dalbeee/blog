const exclude = [];

export const getDescription = (string: string) => {
  let data: string = string;

  data = data.trim();
  try {
    exclude.map((exc) => (data = data.replace(exc, data)));
    data = data.substr(0, 100);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
