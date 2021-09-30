const stringifyItem = (item) => {
    if (typeof item !== "string") {
        return item?.toString() ?? ""
    }
    if (item.indexOf(",") !== -1) {
        return JSON.stringify(item)
    }
    return item
}

const stringifyHeaders = (line, s) =>
    line
        .map(stringifyItem)
        .join(s)

const stringify = (items, options = {}) => {
    const {
        separator = ","
    } = options
    if (Array.isArray(items[0]) === true) {
        return items
            .map(
                (line) => line.map(stringifyItem).join(separator)
            )
            .join("\n")
    }

    const {
        headers = Object.keys(items[0]),
    } = options

    const itemCSV = items.map(
        (source) => headers
            .reduce(
                (item, prop) => {
                    item.push(
                        stringifyItem(source[prop])
                    )
                    return item
                },
                []
            )
            .join(separator)
    )
    return `${stringifyHeaders(headers, separator)}\n${itemCSV}`
}

module.exports = stringify
