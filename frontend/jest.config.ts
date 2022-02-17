// jest.config.ts
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
};
// export default config;

// Or async function
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
      // "^@blog/core$": "<rootDir>/../core/src/index.ts",
    },
    testPathIgnorePatterns: ["./node_modules/", "./test/", "./cypress/*"],
    coverageDirectory: "../coverage",
    // setupFiles: ['./jest.setup.dev.ts'],
  };
};
