const {
  formatDate,
  parseTimeString,
  calculateFutureDate,
  exitPrintingHelp,
  printHelp
} = require('../index.js');

describe('future-commit utility functions', () => {
  
  describe('formatDate', () => {
    test('should format date correctly', () => {
      const testDate = new Date('2023-12-25T15:30:00');
      const formatted = formatDate(testDate);
      expect(formatted).toBe('2023-12-25 15:30');
    });

    test('should handle single digit months and days', () => {
      const testDate = new Date('2023-01-05T09:05:00');
      const formatted = formatDate(testDate);
      expect(formatted).toBe('2023-1-5 9:5');
    });

    test('should handle midnight', () => {
      const testDate = new Date('2023-06-15T00:00:00');
      const formatted = formatDate(testDate);
      expect(formatted).toBe('2023-6-15 0:0');
    });

    test('should handle end of day', () => {
      const testDate = new Date('2023-06-15T23:59:00');
      const formatted = formatDate(testDate);
      expect(formatted).toBe('2023-6-15 23:59');
    });
  });

  describe('parseTimeString', () => {
    test('should parse hour format', () => {
      const result = parseTimeString('1h');
      expect(result).toBe(3600000); // 1 hour in milliseconds
    });

    test('should parse minute format', () => {
      const result = parseTimeString('30m');
      expect(result).toBe(1800000); // 30 minutes in milliseconds
    });

    test('should parse combined hour and minute format', () => {
      const result = parseTimeString('1h30m');
      expect(result).toBe(5400000); // 1.5 hours in milliseconds
    });

    test('should parse second format', () => {
      const result = parseTimeString('45s');
      expect(result).toBe(45000); // 45 seconds in milliseconds
    });

    test('should parse day format', () => {
      const result = parseTimeString('2d');
      expect(result).toBe(172800000); // 2 days in milliseconds
    });

    test('should return null for invalid format', () => {
      const result = parseTimeString('invalid');
      expect(result).toBeNull();
    });

    test('should return null for empty string', () => {
      const result = parseTimeString('');
      expect(result).toBeNull();
    });

    test('should return null for undefined', () => {
      const result = parseTimeString(undefined);
      expect(result).toBeNull();
    });
  });

  describe('calculateFutureDate', () => {
    const mockCurrentTime = new Date('2023-06-15T12:00:00').getTime();

    test('should calculate future date correctly', () => {
      const oneHourMs = 3600000;
      const futureDate = calculateFutureDate(oneHourMs, mockCurrentTime);
      expect(futureDate).toEqual(new Date(mockCurrentTime + oneHourMs));
    });

    test('should handle zero offset', () => {
      const futureDate = calculateFutureDate(0, mockCurrentTime);
      expect(futureDate).toEqual(new Date(mockCurrentTime));
    });

    test('should return null for invalid offset', () => {
      const result = calculateFutureDate(null, mockCurrentTime);
      expect(result).toBeNull();
    });

    test('should return null for NaN offset', () => {
      const result = calculateFutureDate(NaN, mockCurrentTime);
      expect(result).toBeNull();
    });

    test('should use current time when not provided', () => {
      const oneHourMs = 3600000;
      const beforeCall = Date.now();
      const futureDate = calculateFutureDate(oneHourMs);
      const afterCall = Date.now();
      
      expect(futureDate.getTime()).toBeGreaterThanOrEqual(beforeCall + oneHourMs);
      expect(futureDate.getTime()).toBeLessThanOrEqual(afterCall + oneHourMs);
    });

    test('should handle large time offsets', () => {
      const oneYearMs = 365 * 24 * 60 * 60 * 1000;
      const futureDate = calculateFutureDate(oneYearMs, mockCurrentTime);
      expect(futureDate).toEqual(new Date(mockCurrentTime + oneYearMs));
    });
  });

  describe('printHelp', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('should print help information', () => {
      printHelp();
      
      expect(consoleSpy).toHaveBeenCalledWith("-------------------");
      expect(consoleSpy).toHaveBeenCalledWith("Usage: future-commit <time> -m <message>");
      expect(consoleSpy).toHaveBeenCalledWith('Example: future-commit 1h -m "Commit message"');
      expect(consoleSpy).toHaveBeenCalledWith('Example: future-commit 1h30m -m "Commit message"');
      expect(consoleSpy).toHaveBeenCalledWith("");
      expect(consoleSpy).toHaveBeenCalledWith("Tip: You can pass any other git commit arguments after the time");
      expect(consoleSpy).toHaveBeenCalledWith("-------------------");
    });
  });

  describe('exitPrintingHelp', () => {
    let consoleSpy;
    let exitSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      exitSpy.mockRestore();
    });

    test('should print error message and help when message provided', () => {
      const errorMessage = "Test error message";
      exitPrintingHelp(errorMessage);
      
      expect(consoleSpy).toHaveBeenCalledWith("");
      expect(consoleSpy).toHaveBeenCalledWith("Error: " + errorMessage);
      expect(consoleSpy).toHaveBeenCalledWith("");
      expect(exitSpy).toHaveBeenCalledWith(1);
    });

    test('should print only help when no message provided', () => {
      exitPrintingHelp();
      
      // Should not print error-specific messages
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining("Error:"));
      expect(exitSpy).toHaveBeenCalledWith(1);
      // Should still call printHelp which includes empty lines
      expect(consoleSpy).toHaveBeenCalledWith("Usage: future-commit <time> -m <message>");
    });
  });
});
