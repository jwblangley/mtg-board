const { shuffleInPlace } = require("./deckManager")
const { Position } = require("./position")

const { STARTING_DECK_SIZE , MAX_STACK_SIZE } = require("./constants")


function generateEmptyBattlefield(width, height) {
    return Array(height).fill().map(() => Array(width).fill([]))
}

function removeIndex(arr, i) {
    return [...arr.slice(0, i), ...arr.slice(i + 1)]
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

    moveCardToHand(cardUuid, userId) {
        this.moveCard(cardUuid, new Position(userId, Position.LOCATIONS.HAND, 0))
    }

    moveCardToBattlefield(cardUuid, userId, i, j) {
        this.moveCard(cardUuid, new Position(userId, Position.LOCATIONS.BATTLEFIELD, {i, j, stackIndex: 0}))
    }

    moveCardToOtherBattlefield(cardUuid, targetUserId) {
        const newPos = this.findFreePosition(targetUserId)
        this.moveCard(cardUuid, newPos)
    }

    moveCard(cardUuid, newPosition) {
        const { card, position: oldPosition } = this.findCard(cardUuid)
        const userId = oldPosition.userId

        // Don't overcram battlefield cells
        if (newPosition.location === Position.LOCATIONS.BATTLEFIELD) {
            const { i, j, stackIndex } = newPosition.index
            if (this.users.get(newPosition.userId).battlefield[i][j].length >= MAX_STACK_SIZE) {
                return
            }
        }

        // Remove from old position
        if (oldPosition.location === Position.LOCATIONS.HAND)
        {
            const oldHand = this.users.get(userId).hand
            const newHand = removeIndex(oldHand, oldPosition.index)
            this.users.get(userId).hand = newHand
        }
        else if (oldPosition.location === Position.LOCATIONS.BATTLEFIELD)
        {
            const {i, j, stackIndex} = oldPosition.index
            const oldCell = this.users.get(userId).battlefield[i][j]
            const newCell = removeIndex(oldCell, stackIndex)
            this.users.get(userId).battlefield[i][j] = newCell
        }
        else
        {
            throw new Error(`Unknown position type: ${oldPosition.location}`)
        }

        // Add to new position.
        // Ignores highest granularity part of Position.index
        if (newPosition.location === Position.LOCATIONS.HAND)
        {
            const oldHand = this.users.get(newPosition.userId).hand
            const newHand = [...oldHand, card]
            this.users.get(newPosition.userId).hand = newHand
        }
        else if (newPosition.location === Position.LOCATIONS.BATTLEFIELD)
        {
            const {i, j, stackIndex} = newPosition.index
            const oldCell = this.users.get(newPosition.userId).battlefield[i][j]
            const newCell = [...oldCell, card]
            this.users.get(newPosition.userId).battlefield[i][j] = newCell
        }
        else
        {
            throw new Error(`Unknown position type: ${newPosition.location}`)
        }

        this.update()
    }

    findCard(cardUuid) {
        // TODO: More efficient solution
        for (const [userId, user] of this.users.entries())
        {
            // Check hand
            for (let i = 0; i < user.hand.length; i++)
            {
                const card = user.hand[i]
                if (card.uuid === cardUuid) {
                    return {card, position: new Position(userId, Position.LOCATIONS.HAND, i)}
                }
            }

            // Check battlefield
            for (let i = 0; i < user.battlefield.length; i++) {
                for (let j = 0; j < user.battlefield[i].length; j++) {
                    for (let stackIndex = 0; stackIndex < user.battlefield[i][j].length; stackIndex++) {
                        const card = user.battlefield[i][j][stackIndex]
                        if (card.uuid === cardUuid) {
                            return {card, position: new Position(userId, Position.LOCATIONS.BATTLEFIELD, {i, j, stackIndex})}
                        }
                    }
                }
            }
        }
        throw new Error(`Could not find card: ${cardUuid}`)
    }

    findFreePosition(userId) {
        const battlefield = this.users.get(userId).battlefield
        for (let i = 0; i < battlefield.length; i++) {
            for (let j = 0; j < battlefield[i].length; j++) {
                if (battlefield[i][j].length < 5) {
                    return new Position(userId, Position.LOCATIONS.BATTLEFIELD, { i, j, stackIndex: 0 })
                }
            }
        }
        return null
    }

    toggleTapCard(cardUuid) {
        const { card, position } = this.findCard(cardUuid)
        card.tapped = ! card.tapped
        if (position.location !== Position.LOCATIONS.BATTLEFIELD) {
            console.warn(`Trying to toggleTap card=${card.uuid} in ${position.location}`)
            return
        }
        const { i, j, stackIndex } = position.index
        this.users.get(position.userId).battlefield[i][j][stackIndex] = card
        this.update()
    }

    untapAll(userId) {
        const battlefield = this.users.get(userId).battlefield
        this.users.get(userId).battlefield = battlefield.map(
            row => row.map(stack => stack.map(
                card => ({ ...card, tapped: false })
            ))
        )
        this.update()
    }

    drawCard(userId) {
        const library = this.users.get(userId).library
        if (library.length <= 0) {
            return
        }
        const card = library[library.length - 1]
        this.users.get(userId).hand = [...this.users.get(userId).hand, card]
        this.users.get(userId).library = library.slice(0, library.length - 1)
        this.update()
    }
}

module.exports = {
    GameState
}
