const loggerFactory = function () {
  if (typeof window === "undefined") return function () {};
  if (process.env.NODE_ENV !== "development") return function () {};

  const logger = console.log.bind(window.console);
  return logger;
};

export const logger = loggerFactory();

// const isDebug = true;
// class SaninnLogger {
//   private logPrefix = "";
//   constructor(logPrefix?: string) {
//     if (logPrefix) {
//       this.logPrefix = `[${logPrefix}]: `;
//     }
//   }

//   get log(): Function {
//     if (!isDebug) {
//       return () => {};
//     }
//     const logPrefix = this.logPrefix;
//     if (logPrefix.length) {
//       return console.log.bind(window.console, logPrefix);
//     } else {
//       return console.log.bind(window.console);
//     }
//   }

//   get warn(): Function {
//     if (!isDebug) {
//       return () => {};
//     }
//     const logPrefix = this.logPrefix;
//     if (logPrefix.length) {
//       return console.warn.bind(window.console, logPrefix);
//     } else {
//       return console.warn.bind(window.console);
//     }
//   }

//   get dir(): Function {
//     if (!isDebug) {
//       return () => {};
//     }
//     const logPrefix = this.logPrefix;
//     if (logPrefix.length) {
//       return console.dir.bind(window.console, logPrefix);
//     } else {
//       return console.dir.bind(window.console);
//     }
//   }

//   get error(): Function {
//     if (!isDebug) {
//       return () => {};
//     }
//     const logPrefix = this.logPrefix;
//     if (logPrefix.length) {
//       return console.error.bind(window.console, logPrefix);
//     } else {
//       return console.error.bind(window.console);
//     }
//   }
// }

// export const logger2 = new SaninnLogger();
