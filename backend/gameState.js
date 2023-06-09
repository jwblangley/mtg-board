const { shuffleInPlace } = require("./deckManager")

const STARTING_DECK_SIZE = 7


function generateEmptyBattlefield(width, height) {
    return Array(height).fill().map(() => Array(width).fill([]))
}


class GameState {
    constructor(lobbyId, publishStateUpdate, battlefieldWidth, battlefieldHeight) {
        this.lobbyId = lobbyId
        this.publishStateUpdate = publishStateUpdate
        this.battlefieldWidth = battlefieldWidth
        this.battlefieldHeight = battlefieldHeight

        this.started = false
        this.users = new Map()
        this.decks = new Map()
    }

    getState() {
        return {
            started: this.started,
            users: Object.fromEntries(this.users)
        }
    }

    update() {
        this.publishStateUpdate(this.lobbyId, this.getState())
    }

    addUser(userId, hosting=false) {
        this.users.set(userId, {
            hosting: hosting,
            ready: false,
            hand: [],
            library: [],
            battlefield: generateEmptyBattlefield(this.battlefieldWidth, this.battlefieldHeight)
        })
        this.update()
    }

    setDeck(userId, deck) {
        if (this.users.has(userId)) {
            this.decks.set(userId, deck)
        }
    }

    startGame() {
        if (!Array.from(this.users.keys()).every(u => this.users.get(u).ready))
        {
            return false
        }

        if (!Array.from(this.users.keys).every(u => this.decks.has(u))) {
            return false
        }

        Array.from(this.users.keys()).forEach(u => {
            let tempDeck = [...this.decks.get(u).deck]
            shuffleInPlace(tempDeck)
            this.users.get(u).hand = tempDeck.slice(0, STARTING_DECK_SIZE)
            this.users.get(u).library = tempDeck.slice(STARTING_DECK_SIZE)
        })

        this.started = true
        this.update()
        return true
    }

    moveCard(id, toI, toJ) {
        const { i: fromI, j: fromJ, stackIndex: fromStackIndex, card } = this.findCard(id)
        this.battlefield[fromI][fromJ] = this.battlefield[fromI][fromJ].filter(({id: cid}) => cid !== id)
        this.battlefield[toI][toJ] = [...this.battlefield[toI][toJ], card]
        this.update()
    }

    findCard(id) {
        // TODO @James: More efficient solution
        for (let i = 0; i < this.battlefield.length; i++) {
            for (let j = 0; j < this.battlefield[i].length; j++) {
                for (let stackIndex = 0; stackIndex < this.battlefield[i][j].length; stackIndex++) {
                    const card = this.battlefield[i][j][stackIndex]
                    if (card.id === id) {
                        return {i, j, stackIndex, card}
                    }
                }
            }
        }
    }
}

module.exports = {
    GameState
}
