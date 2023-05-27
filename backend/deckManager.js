const fs = require("fs")
const crypto = require("crypto")


function listCardImages() {
    const dir = process.env["CARD_IMAGE_LOCATION"]
    return fs.readdirSync(dir)
}

function imageFromName(knownCards, name) {
    for (let i = 0; i < knownCards.length; i++) {
        const card = knownCards[i]
        if (card.startsWith(name)) {
            return card
        }
    }
    return undefined
}

function parseDeck(deckConfig) {
    let deck = {
        commander: "",
        deck: []
    }

    const knownCards = listCardImages()

    const lines = deckConfig.split("\n")
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().length === 0) {
            continue
        }

        if (lines[i].trim().startsWith("SIDEBOARD")) {
            break
        }

        const parts = lines[i].split(/\s/)
        if (parts.length < 2) {
            return {deck: undefined, reason: `Bad format on line ${i + 1}.`}
        }

        const num = parseInt(parts[0])
        if (num === NaN) {
            return {deck: undefined, reason: `Bad format on line ${i + 1}.`}
        }

        const name = parts.slice(1).join(" ")
        const image = imageFromName(knownCards, name)
        if (!image) {
            return {deck: undefined, reason: `No card image for "${name}".`}
        }

        for (j = 0; j < num; j++) {
            const card = {
                uuid: crypto.randomUUID(),
                image: image
            }

            if (deck.deck.length === 0) {
                deck.commander = card
            }

            deck.deck.push(card)
        }
    }

    if (deck.deck.length !== 100) {
        return {deck: undefined, reason: `Deck has ${deck.deck.length} cards. Expected 100.`}
    }
    return {deck: deck, reason: "Success!"}
}

module.exports = {
    parseDeck
}
