export default (milliSecs: number) =>
  new Promise((res, rej) => setTimeout(res, milliSecs));
