function generateEmptyBattlefield(width, height) {
    return Array(height).fill().map(() => Array(width).fill([]))
}

class GameState {
    constructor(publishStateUpdate, battlefieldWidth, battledieldHeight) {
        this.publishStateUpdate = publishStateUpdate
        // this.battlefield = generateEmptyBattlefield(battlefieldWidth, battledieldHeight)

        // Set up test content
        const testContent = generateEmptyBattlefield(battlefieldWidth, battledieldHeight)
        testContent[0][0] = [
            { id: "a" },
            { id: "b" },
            { id: "c" },
            { id: "d" },
            { id: "e" }
        ]

        this.battlefield = testContent
    }

    getState() {
        return this.battlefield
    }

    update() {
        this.publishStateUpdate(this.getState())
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
