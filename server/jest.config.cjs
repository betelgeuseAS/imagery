module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'build/config', 'build/app.js'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  transform: { '\\.ts$': ['ts-jest'] }
}
