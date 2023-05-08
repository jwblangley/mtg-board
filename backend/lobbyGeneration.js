const crypto = require("crypto")

function decimalTohex(decimal) {
    return decimal.toString(16).padStart(2, "0")
}

function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2)
    crypto.getRandomValues(arr)
    return Array.from(arr, decimalTohex).join('')
}

module.exports = {
    generateId
}
