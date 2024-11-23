module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup.jest.ts"],
  moduleNameMapper: {
    "@shared(.*)$": "<rootDir>/src/app/shared/$1",
  },
};
