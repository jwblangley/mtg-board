LOCATIONS = {
    BATTLEFIELD: "battlefield",
    HAND: "hand"
}

class Position {
    constructor(userId, location, index){
        this.userId = userId
        this.location = location
        this.index = index
    }

    static get LOCATIONS() {
        return LOCATIONS
    }

    toString() {
        return `Position: ${this.userId}:${this.location}:${this.index}`
    }
}

module.exports = {
    Position
}
