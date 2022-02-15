export default {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  // roots: ["."],
  rootDir: '.',

  testRegex: '^.*\\.e2e-spec\\.(t|j)s',
  transform: {},
  // testEnvironment: "node",

  // testPathIgnorePatterns: ["./test/"],
  transformIgnorePatterns: ['./node_modules/'],
  coverageDirectory: '../coverage',
  // setupFiles: ['./jest.setup.dev.ts'],

  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    // '^(\\.{1,2}/.*)\\.js$': '$1',
    '@src/(.*)': '<rootDir>/src/$1',
  },
};
