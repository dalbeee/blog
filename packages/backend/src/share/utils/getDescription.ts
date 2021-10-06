const exclude = [];

export const getDescription = (string: string) => {
  // console.log('getDescrpition', string);
  let data: string = string;

  data = data.trim();
  try {
    exclude.map((exc) => (data = data.replace(exc, data)));
    data = data.substr(0, 100);
    return data;
  } catch (error) {
    console.log('error', error.mssage);
    throw new Error(error.message);
  }
};
