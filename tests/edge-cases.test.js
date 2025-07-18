const {
  parseDuration,
  formatDate,
  parseTimeString,
  calculateFutureDate
} = require('../index.js');

describe('Edge cases and error scenarios', () => {
  
  describe('formatDate edge cases', () => {
    test('should handle leap year February', () => {
      const leapYearDate = new Date('2024-02-29T12:00:00');
      const formatted = formatDate(leapYearDate);
      expect(formatted).toBe('2024-02-29 12:00:00');
    });

    test('should handle year boundaries', () => {
      const newYearDate = new Date('2024-01-01T00:00:00');
      const formatted = formatDate(newYearDate);
      expect(formatted).toBe('2024-01-01 00:00:00');
    });

    test('should handle invalid date objects', () => {
      const invalidDate = new Date('invalid');
      const formatted = formatDate(invalidDate);
      expect(formatted).toBe(null);
    });

    test('should handle far future dates', () => {
      const farFuture = new Date('3000-12-31T23:59:59');
      const formatted = formatDate(farFuture);
      expect(formatted).toBe('3000-12-31 23:59:59');
    });

    test('should handle very old dates', () => {
      const oldDate = new Date('1970-01-01T00:00:00');
      const formatted = formatDate(oldDate);
      expect(formatted).toBe('1970-01-01 00:00:00');
    });
  });

  describe('parseTimeString edge cases', () => {
    test('should handle mixed case input', () => {
      const result = parseTimeString('1H30M');
      expect(result).toBe(5400000); // Custom parser handles mixed case
    });

    test('should handle whitespace', () => {
      const result = parseTimeString(' 1h ');
      expect(result).toBe(3600000); // Custom parser handles whitespace
    });

    test('should handle zero values', () => {
      const result = parseTimeString('0h');
      expect(result).toBe(0);
    });

    test('should handle very large values', () => {
      const result = parseTimeString('1000h');
      expect(result).toBe(3600000000); // 1000 hours in milliseconds
    });

    test('should handle decimal values', () => {
      const result = parseTimeString('1.5h');
      expect(result).toBe(5400000); // 1.5 hours in milliseconds
    });

    test('should handle invalid input', () => {
      const result = parseTimeString('invalid');
      expect(result).toBe(null); // Custom parser returns null for invalid input
    });
  });

  describe('calculateFutureDate edge cases', () => {
    test('should handle very large offsets', () => {
      const currentTime = Date.now();
      const veryLargeOffset = Number.MAX_SAFE_INTEGER;
      const result = calculateFutureDate(veryLargeOffset, currentTime);
      expect(result.toString()).toContain('Invalid Date'); // Results in Invalid Date
    });

    test('should handle negative offsets', () => {
      const currentTime = new Date('2023-06-15T12:00:00').getTime();
      const negativeOffset = -3600000; // -1 hour
      const result = calculateFutureDate(negativeOffset, currentTime);
      expect(result).toBe(null); // Custom function returns null for negative offsets
    });

    test('should handle zero current time', () => {
      const result = calculateFutureDate(3600000, 0);
      expect(result).toEqual(new Date(3600000));
    });

    test('should handle very small offsets', () => {
      const currentTime = Date.now();
      const smallOffset = 1; // 1 millisecond
      const result = calculateFutureDate(smallOffset, currentTime);
      expect(result).toEqual(new Date(currentTime + 1));
    });

    test('should handle floating point offsets', () => {
      const currentTime = Date.now();
      const floatOffset = 1000.5; // 1.5 seconds
      const result = calculateFutureDate(floatOffset, currentTime);
      expect(result).toEqual(new Date(currentTime + Math.floor(floatOffset)));
    });
  });

  describe('Date arithmetic edge cases', () => {
    test('should handle daylight saving time transitions', () => {
      // This is more relevant for real-world usage
      const dstTransition = new Date('2023-03-12T01:30:00'); // Spring forward in US
      const oneHour = 3600000;
      const result = calculateFutureDate(oneHour, dstTransition.getTime());
      expect(result).toBeInstanceOf(Date);
    });

    test('should handle month boundaries', () => {
      const endOfMonth = new Date('2023-01-31T23:30:00').getTime();
      const oneHour = 3600000;
      const result = calculateFutureDate(oneHour, endOfMonth);
      expect(result.getMonth()).toBe(1); // February (0-indexed)
    });

    test('should handle year boundaries', () => {
      const endOfYear = new Date('2023-12-31T23:30:00').getTime();
      const oneHour = 3600000;
      const result = calculateFutureDate(oneHour, endOfYear);
      expect(result.getFullYear()).toBe(2024);
    });
  });

  describe('Input validation', () => {
    test('parseTimeString should handle null input', () => {
      const result = parseTimeString(null);
      expect(result).toBeNull();
    });

    test('parseTimeString should handle numeric input', () => {
      const result = parseTimeString(3600);
      expect(result).toBe(null); // Custom parser only handles strings
    });

    test('calculateFutureDate should handle string offset', () => {
      const result = calculateFutureDate('1000', Date.now());
      expect(result).toBe(null); // Custom function returns null for invalid input
    });

    test('formatDate should handle null input', () => {
      const result = formatDate(null);
      expect(result).toBe(null); // Custom function returns null instead of throwing
    });

    test('formatDate should handle undefined input', () => {
      const result = formatDate(undefined);
      expect(result).toBe(null); // Custom function returns null instead of throwing
    });

    test('formatDate should handle string input', () => {
      const result = formatDate('2023-01-01');
      expect(result).toBe(null); // Custom function returns null instead of throwing
    });
  });
});
