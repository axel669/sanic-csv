const parse = require("../parse")
const stringify = require("../stringify")
const csvstring = require("csv-stringify/lib/sync")
const fs = require("fs")

const sourceData = fs.readFileSync("./test/data/1.csv", "utf8")

const arraySource = parse(sourceData, {header: false})
const objSource = parse(sourceData)

const count = Array.from({length: 5})

const tests = [
    ["array-sanic", () => stringify(arraySource)],
    ["array-csv-parse", () => csvstring(arraySource)],
    ["obj-sanic", () => stringify(objSource)],
    ["obj-csv-parse", () => csvstring(objSource)],
]
for (const _ of count) {
    for (const [label, func] of tests) {
        console.time(label)
        func()
        console.timeEnd(label)
    }
    console.log("-".repeat(30))
}

console.log(stringify(arraySource).length)
console.log(stringify(objSource).length)
console.log(csvstring(arraySource).length)
console.log(csvstring(objSource).length)
