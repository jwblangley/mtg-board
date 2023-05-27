const fs = require("fs")
const crypto = require("crypto")
const multer = require('multer')

const DATA_DIRECTORY = process.env["CARD_IMAGE_LOCATION"]


function listCardImages() {
    return fs.readdirSync(DATA_DIRECTORY)
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DATA_DIRECTORY)
    },
    filename: function (req, file, cb) {
        // Keep exact original file name
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).array('file')

function uploadCards(req, res) {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        res.send(`Successfully uploaded ${req.files.length} card(s)`)
    })
}

function shuffleInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

module.exports = {
    parseDeck, uploadCards, shuffleInPlace
}
