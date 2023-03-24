module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverage: true,
  coverageReporters: ['html','text-summary'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/tests/**',
  ],
  bail: 1,
  verbose: true
};
