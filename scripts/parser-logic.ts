import { format, LogLevel } from "./format";
import * as fs from "fs";
import * as readline from "readline";
import * as events from "events";

export class Parser {
  async parse(
    inputLocation: string,
    outputLocation: string,
    logLevel: LogLevel = LogLevel.error
  ) {
    console.log("Job is started");

    const writer = fs.createWriteStream(outputLocation, {
      encoding: "utf-8",
    });

    const readInterface = readline.createInterface({
      input: fs.createReadStream(inputLocation),
    });

    writer.write("[");

    readInterface
      .on("line", function (line) {
        const result = format(logLevel, line);
        if (result) {
          writer.write(JSON.stringify(result));
        }
      })
      .on("close", function () {
        writer.write("]");

        console.log("Job is finished");
      });

    await events.once(readInterface, "close");
  }
}
