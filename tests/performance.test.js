const {
  parseDuration,
  formatDate,
  parseTimeString,
  calculateFutureDate
} = require('../index.js');

describe('Performance tests', () => {
  
  test('formatDate should be performant with many calls', () => {
    const testDate = new Date('2023-06-15T12:30:45');
    const iterations = 10000;
    
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      formatDate(testDate);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    // Should complete 10,000 calls in less than 100ms
    expect(totalTime).toBeLessThan(100);
  });

  test('parseTimeString should be performant with various inputs', () => {
    const testInputs = ['1h', '30m', '2d', '1h30m', '45s'];
    const iterations = 1000;
    
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      testInputs.forEach(input => parseTimeString(input));
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    // Should complete 5,000 calls in less than 200ms
    expect(totalTime).toBeLessThan(200);
  });

  test('calculateFutureDate should be performant', () => {
    const baseTime = Date.now();
    const offset = 3600000; // 1 hour
    const iterations = 10000;
    
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      calculateFutureDate(offset, baseTime);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    // Should complete 10,000 calls in less than 50ms
    expect(totalTime).toBeLessThan(50);
  });

  test('memory usage should be reasonable', () => {
    const initialMemory = process.memoryUsage().heapUsed;
    const testDate = new Date();
    const iterations = 1000;
    
    // Create many date objects to test memory efficiency
    const dates = [];
    for (let i = 0; i < iterations; i++) {
      dates.push(calculateFutureDate(i * 1000, testDate.getTime()));
    }
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;
    
    // Memory increase should be reasonable (less than 10MB for 1000 dates)
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    
    // Clean up
    dates.length = 0;
  });
});
