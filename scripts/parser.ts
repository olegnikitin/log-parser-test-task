import * as fs from 'fs'
import * as readline from 'readline'
import {format, LogLevel} from "./format"

const consoleInput: string[] = process.argv
const inputPresent: boolean = consoleInput[2] === '--input'
const inputLocation: string = consoleInput[3]
const outputPresent: boolean = consoleInput[4] === '--output'
const outputLocation: string = consoleInput[5]

if (inputPresent && outputPresent) {
    try {
        const memo = []
        const writer = fs.createWriteStream(outputLocation, {encoding: "utf-8"})

        const readInterface = readline.createInterface({
            input: fs.createReadStream(inputLocation),
        });

        readInterface.on('line', function(line) {
            const result = format(LogLevel.error, line)
            if (result) {
                memo.push(result)
            }
        });

        readInterface.on('close', function () {
            writer.write(JSON.stringify(memo))

            console.log('Job is finished')
        })
    } catch (e) {
        console.error('error happened on data transferring', e)
        process.exit(-1)
    }
} else {
    console.error('wrong input or output')
    process.exit(1)
}
