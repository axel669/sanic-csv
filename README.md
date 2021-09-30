# Sanic CSV
A high brow, fast csv parsing library.

![Sanic](sanic.jpg)

## Installation

With NPM
```bash
npm i @axel669/sanic-csv
```

With Yarn
```bash
yarn add @axel669/sanic-csv
```

## API
```javascript
//  bring in both functions
const sanic = require("@axel669/sanic-csv")

//  bring in specific functions
const parse = require("@axel669/sanic-csv/parse")
const stringify = require("@axel669/sanic-csv/stringify")

sanic.parse(csvText)
sanic.stringify(csvData)
```
