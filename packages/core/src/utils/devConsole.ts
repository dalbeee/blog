export const devConsole = (message?: any, ...optionalParams: any[]) => {
  console.log(
    process.env.NODE_ENV === "development" && "DEV MODE >",
    message,
    ...optionalParams
  );
};
