const { formatDate, parseTimeString, calculateFutureDate } = require("../index.js");

describe("core functions", () => {
  test("formatDate works", () => {
    const date = new Date("2023-12-25T15:30:00");
    expect(formatDate(date)).toBe("2023-12-25 15:30:00");
  });
  
  test("parseTimeString works", () => {
    expect(parseTimeString("1h")).toBe(3600000);
  });
  
  test("calculateFutureDate works", () => {
    const currentTime = new Date("2023-06-15T12:00:00").getTime();
    const oneHour = 3600000;
    const result = calculateFutureDate(oneHour, currentTime);
    expect(result).toEqual(new Date("2023-06-15T13:00:00"));
  });
});
