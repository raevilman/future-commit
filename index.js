#!/usr/bin/env node

const yesno = require('yesno');
const { execSync } = require('child_process');

/**
 * Parse duration string into milliseconds
 * Supports formats like: 1h, 30m, 45s, 2d, 1h30m, 2d5h30m
 */
function parseDuration(str) {
  if (!str || typeof str !== 'string') {
    return null;
  }

  const units = {
    d: 24 * 60 * 60 * 1000, // days to milliseconds
    h: 60 * 60 * 1000,      // hours to milliseconds
    m: 60 * 1000,           // minutes to milliseconds
    s: 1000                 // seconds to milliseconds
  };

  let totalMs = 0;
  const regex = /(\d+(?:\.\d+)?)\s*([dhms])/gi;
  let match;
  let hasMatch = false;

  while ((match = regex.exec(str)) !== null) {
    hasMatch = true;
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    
    if (units[unit]) {
      totalMs += value * units[unit];
    }
  }

  return hasMatch ? totalMs : null;
}

function formatDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function parseTimeString(timeStr) {
  if (!timeStr) {
    return null;
  }
  
  const milliseconds = parseDuration(timeStr);
  return milliseconds;
}

function calculateFutureDate(offsetMs, currentTime = Date.now()) {
  if (typeof offsetMs !== 'number' || isNaN(offsetMs) || offsetMs < 0) {
    return null;
  }
  
  if (typeof currentTime !== 'number' || isNaN(currentTime)) {
    return null;
  }
  
  return new Date(currentTime + offsetMs);
}

function printHelp() {
  console.log(`
Usage: future-commit <time> [git commit arguments]

Examples:
  future-commit 1h -m "Commit message"
  future-commit 30m -a -m "Auto-add and commit"
  future-commit 2d --amend
  future-commit 1h30m -m "Complex time format"

Time formats:
  - s: seconds (e.g., 30s)
  - m: minutes (e.g., 45m)
  - h: hours (e.g., 2h)
  - d: days (e.g., 1d)
  - Combined: (e.g., 1h30m, 2d5h)

The tool will set the commit date to the specified time in the future.
  `);
}

function exitPrintingHelp(message) {
  if (message) {
    console.error(`Error: ${message}`);
  }
  printHelp();
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printHelp();
    return;
  }
  
  const timeStr = args[0];
  const gitArgs = args.slice(1);
  
  const offsetMs = parseTimeString(timeStr);
  if (offsetMs === null) {
    exitPrintingHelp(`Invalid time format: ${timeStr}`);
    return;
  }
  
  const futureDate = calculateFutureDate(offsetMs);
  const formattedDate = formatDate(futureDate);
  
  console.log(`Future commit will be dated: ${formattedDate}`);
  
  const ok = await yesno({
    question: 'Proceed with commit? (y/n)'
  });
  
  if (!ok) {
    console.log('Commit cancelled.');
    return;
  }
  
  try {
    const gitCommand = `git commit --date="${formattedDate}" ${gitArgs.join(' ')}`;
    console.log(`Running: ${gitCommand}`);
    execSync(gitCommand, { stdio: 'inherit' });
    console.log('Commit successful!');
  } catch (error) {
    console.error('Git commit failed:', error.message);
    process.exit(1);
  }
}

// Export functions for testing
module.exports = {
  parseDuration,
  formatDate,
  parseTimeString,
  calculateFutureDate,
  printHelp,
  exitPrintingHelp,
  main
};

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
