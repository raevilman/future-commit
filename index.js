#! /usr/bin/env node
const spawn = require("child_process").spawn
const yesno = require("yesno");
const parse = require("parse-duration");
// import { spawn } from "child_process";
// import parse from "parse-duration";
// import yesno from "yesno";
const myArgs = process.argv.slice(2);

if(!myArgs || myArgs.length < 1) exitPrintingHelp();

// process args
const firstArg = myArgs[0];
myArgs.shift();
myArgs.unshift("commit");

// parse time
const msShift = parse(firstArg);
if (!msShift) {
  exitPrintingHelp("Invalid time format");
}

// prepare future date
const nowMillis = Date.now();
const futureMillis =
  msShift && !isNaN(msShift) ? nowMillis + msShift : nowMillis;
const futureDate = new Date(futureMillis);

// confirm and commit
seekConfirmation(futureDate);


// functions below

// prompt to confirm
async function seekConfirmation(futureDate) {
  console.log("Commit time: ", futureDate.toLocaleString());
  const ok = await yesno({
    question: "Continue?",
  });
  if (ok) gitCommit();
}

// run git command
function gitCommit() {
  // Git format
  // GIT_AUTHOR_DATE='2021-12-21 21:03' GIT_COMMITTER_DATE='2021-12-21 21:03' git commit -m 'msg'
  
  const formattedDateWithQuotes = "'" + formatDate(futureDate) + "'";

  try {
    var child = spawn("git", myArgs, {
      env: {
        ...process.env,
        GIT_AUTHOR_DATE: formattedDateWithQuotes,
        GIT_COMMITTER_DATE: formattedDateWithQuotes,
      },
    });

    //spit stdout to screen
    child.stdout.on("data", function (data) {
      process.stdout.write(data.toString());
    });

    //spit stderr to screen
    child.stderr.on("data", function (data) {
      process.stdout.write(data.toString());
    });

    child.on("close", function (code) {
      console.log(code === 0 ? "See you in the future!": "Back to present!");
    });
  } catch (error) {
    console.log(error);
  }
}

// function to format date in '2021-12-21 21:03' format
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function exitPrintingHelp(msg) {
  if (msg) {
    console.log("");
    console.log("Error: " + msg);
    console.log("");
  }
  printHelp();
  process.exit(1);
}

function printHelp() {
  console.log("-------------------");
  console.log("Usage: future-commit <time> -m <message>");
  console.log('Example: future-commit 1h -m "Commit message"');
  console.log('Example: future-commit 1h30m -m "Commit message"');
  // log blank line
  console.log("");
  console.log(
    "Tip: You can pass any other git commit arguments after the time"
  );
  console.log("-------------------");
}
