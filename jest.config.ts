/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^.+\\.css$": "<rootDir>/test/styleMock.ts",
    "^.+\\.svg$": "<rootDir>/test/svgMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": ["@swc/jest"],
  },
  testEnvironment: "jsdom",
  verbose: true,
};
