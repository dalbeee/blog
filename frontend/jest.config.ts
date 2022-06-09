import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    moduleFileExtensions: ["js", "ts", "tsx"],
    roots: ["."],
    testEnvironment: "jsdom",

    testRegex: "^.*\\.spec.(ts|tsx)$",
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
      "@src/(.*)": "<rootDir>/src/$1",
    },
    testPathIgnorePatterns: ["./node_modules/"],
    coverageDirectory: "../coverage",
  };
};
