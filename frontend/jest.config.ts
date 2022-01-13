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
    moduleFileExtensions: ["js", "json", "ts"],
    roots: ["."],

    testRegex: ".[^e2e].*test.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest",
    },
    // testEnvironment: 'node',
    moduleNameMapper: {
      "@src/(.*)": "<rootDir>/src/$1",
      // "^@blog/core$": "<rootDir>/../core/src/index.ts",
    },
    transformIgnorePatterns: ["./node_modules/", "./test/"],
    coverageDirectory: "../coverage",
    // setupFiles: ['./jest.setup.dev.ts'],
  };
};
