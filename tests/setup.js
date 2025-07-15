// Jest setup file
// This file runs before all tests

// Suppress console output during tests unless specifically testing console output
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  // Only suppress console output if not in verbose mode
  if (!process.env.VERBOSE_TESTS) {
    console.log = jest.fn();
    console.error = jest.fn();
  }
});

afterAll(() => {
  // Restore original console methods
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

// Mock process.exit to prevent tests from actually exiting
const originalExit = process.exit;
beforeAll(() => {
  process.exit = jest.fn();
});

afterAll(() => {
  process.exit = originalExit;
});

// Set test timeout for longer integration tests
jest.setTimeout(10000);
