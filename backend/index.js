const { Server } = require("socket.io");
require("dotenv").config()

const { GameState } = require("./gameState")

const BATTLEFIELD_WIDTH = 7
const BATTLEFIELD_HEIGHT = 4

const io = new Server({
    cors: {
        origin: process.env["CORS_ALLOW"]
    }
});

const MESSAGE_TYPES = {
    GAMESTATE: "gameState",
    CARD_MOVE: "cardMove"
}

function publishStateUpdate(gameState) {
    io.emit(MESSAGE_TYPES.GAMESTATE, gameState)
}

let gameState = new GameState(publishStateUpdate, BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT)

function setupHandlers(socket) {
    socket.on(MESSAGE_TYPES.CARD_MOVE, ({id, i, j}) => {
        gameState.moveCard(id, i, j)
    })
}

io.on("connection", (socket => {
    setupHandlers(socket)

    const userId = socket.handshake["query"]["userId"]
    console.log(`${userId} connected`)

    socket.emit(MESSAGE_TYPES.GAMESTATE, gameState.getState())

}))

io.listen(8000)
