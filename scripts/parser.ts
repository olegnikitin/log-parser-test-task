import { Parser } from "./parser-logic";

const consoleInput: string[] = process.argv;
const inputPresent: boolean = consoleInput[2] === "--input";
const inputLocation: string = consoleInput[3];
const outputPresent: boolean = consoleInput[4] === "--output";
const outputLocation: string = consoleInput[5];

if (inputPresent && outputPresent) {
  try {
    new Parser().parse(inputLocation, outputLocation);
  } catch (e) {
    console.error("error happened on data transferring", e);
    process.exit(-1);
  }
} else {
  console.error("wrong input or output");
  process.exit(1);
}
