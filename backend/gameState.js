function generateEmptyBattlefield(width, height) {
    return Array(height).fill().map(() => Array(width).fill([]))
}

class GameState {
    constructor(battlefieldWidth, battledieldHeight) {
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
}

module.exports = {
    GameState
}
