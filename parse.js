const tokenRegex = /(?<eol>[\r\n]+|$)|((?<string>"([^\r\n"]|\\")*")|(?<raw>[^,\r\n]*))(,|$)/gm
const parseToken = (token) => {
    if (token.groups.string !== undefined) {
        return JSON.parse(token.groups.string)
    }

    return token.groups.raw
}

const parse = (rawData, opts = {}) => {
    const lines = []
    let currentLine = []
    let headers = null

    const {
        header = true,
        entryMap = i => i,
    } = opts

    const processLine = () => {
        const line = currentLine
        currentLine = []

        if (line.length === 0) {
            return
        }

        if (header === true && headers === null) {
            headers = line
            return
        }

        if (headers !== null) {
            const entry = headers.reduce(
                (value, name, index) => {
                    value[name] = line[index] ?? ""
                    return value
                },
                {}
            )
            lines.push(
                entryMap(entry)
            )
            return
        }

        lines.push(
            entryMap(line)
        )
    }
    const processToken = (token) => {
        if (token.groups.eol !== undefined) {
            processLine()
            return
        }

        currentLine.push(
            parseToken(token)
        )
    }
    for (const token of rawData.matchAll(tokenRegex)) {
        processToken(token)
    }

    return lines
}

module.exports = parse
