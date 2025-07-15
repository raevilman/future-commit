# Test Suite for future-commit

This directory contains comprehensive test cases for the future-commit utility.

## Test Files

### `index.test.js`
Core unit tests for the main functions:
- `formatDate()` - Tests date formatting functionality
- `parseTimeString()` - Tests time string parsing
- `calculateFutureDate()` - Tests future date calculation
- `printHelp()` - Tests help output
- `exitPrintingHelp()` - Tests error handling and help display

### `integration.test.js`
Integration tests that test the CLI as a whole:
- Command line argument parsing
- Error handling for invalid inputs
- Help display functionality
- Confirmation prompt behavior

### `edge-cases.test.js`
Tests for edge cases and error scenarios:
- Leap years and date boundaries
- Large and small time values
- Invalid inputs and error conditions
- Date arithmetic edge cases

### `performance.test.js`
Performance tests to ensure the utility is efficient:
- Function execution speed tests
- Memory usage tests
- Bulk operation performance

### `setup.js`
Test setup configuration:
- Console output mocking
- Process exit mocking
- Test timeout configuration

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npx jest tests/index.test.js

# Run tests in verbose mode
VERBOSE_TESTS=1 npm test
```

## Coverage

The test suite aims for high coverage of:
- All exported functions
- Error conditions
- Edge cases
- CLI integration scenarios

## Test Philosophy

1. **Unit Tests**: Test individual functions in isolation
2. **Integration Tests**: Test the CLI as users would interact with it
3. **Edge Case Tests**: Ensure robustness with unusual inputs
4. **Performance Tests**: Verify the utility performs well at scale

## Adding New Tests

When adding new functionality:
1. Add unit tests for new functions
2. Add integration tests for new CLI features
3. Consider edge cases for the new functionality
4. Add performance tests if the feature could impact performance
