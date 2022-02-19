// jest.config.ts
import type { Config } from '@jest/types';

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    roots: ['.'],

    testRegex: '^.*\\.unit-spec.ts$',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
      '@src/(.*)': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: ['./test/'],
    transformIgnorePatterns: ['./node_modules/', './test/'],
    coverageDirectory: '../coverage',
    // setupFiles: ['./jest.setup.dev.ts'],
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
  };
};
