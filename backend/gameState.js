function generateEmptyBattlefield(width, height) {
    return Array(height).fill().map(() => Array(width).fill([]))
}


class GameState {
    constructor(lobbyId, publishStateUpdate, battlefieldWidth, battlefieldHeight) {
        this.lobbyId = lobbyId
        this.publishStateUpdate = publishStateUpdate
        this.battlefieldWidth = battlefieldWidth
        this.battlefieldHeight = battlefieldHeight

        // Set up test content
        this.testContent = generateEmptyBattlefield(battlefieldWidth, battlefieldHeight)
        this.testContent[0][0] = [
            { id: "a" },
            { id: "b" },
            { id: "c" },
            { id: "d" },
            { id: "e" }
        ]

        this.started = false
        this.users = new Map()
    }

    getState() {
        return {
            started: this.started,
            users: Object.fromEntries(this.users)
        }
    }

    addUser(userId, hosting=false) {
        this.users.set(userId, {
            hosting: hosting,
            ready: false,
            battlefield: this.testContent
            // battlefield: generateEmptyBattlefield(this.battlefieldWidth, this.battlefieldHeight)
        })
        this.update()
    }

    update() {
        this.publishStateUpdate(this.lobbyId, this.getState())
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
