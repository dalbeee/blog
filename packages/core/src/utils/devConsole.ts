export const devConsole = (message?: any, ...optionalParams: any[]) => {
  process.env.NODE_ENV === "development" &&
    console.log("DEV MODE >", message, ...optionalParams);
};
