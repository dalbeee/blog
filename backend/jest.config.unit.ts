// jest.config.ts
import type { Config } from '@jest/types';

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    roots: ['.'],

    testRegex: '.spec.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
      '@src/(.*)': '<rootDir>/src/$1',
    },
    transformIgnorePatterns: ['./node_modules/', './test/'],
    coverageDirectory: '../coverage',
    setupFiles: ['./jest.setup.dev.ts'],
  };
};
