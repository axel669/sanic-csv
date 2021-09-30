const sanic = require("../parse")
const csvparse = require("csv-parse/lib/sync")
const neatcsv = require("neat-csv")
const fs = require("fs").promises
const {createReadStream} = require("fs")

const runTests = async (tests) => {
    for (const [label, func] of Object.entries(tests)) {
        console.time(label)
        await func()
        console.timeEnd(label)
    }
    console.log("-".repeat(30))
}

const main = async () => {
    const csvData = await fs.readFile("./test/data/1.csv", "utf8")
    const count = Array.from({length: 20})

    const test = {
        sanic: () => sanic(csvData),
        csvparse: () => csvparse(csvData),
        nestcsv: () => neatcsv(csvData)
    }

    for (const _ of count) {
        await runTests(test)
    }
}

main()
