module.exports = {
    testEnvironment: 'jsdom', // Required for React DOM testing
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS/SCSS imports
    },
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Use babel-jest for TS/JSX
    },
  };