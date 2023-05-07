const { Server } = require("socket.io");

const { GameState } = require("./gameState")

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

const MESSAGE_TYPES = {
    GAMESTATE: "gameState",
    CARD_MOVE: "cardMove"
}

function publishStateUpdate(gameState) {
    io.emit(MESSAGE_TYPES.GAMESTATE, gameState)
}

function setupHandlers(socket) {
    socket.on(MESSAGE_TYPES.CARD_MOVE, ({id, i, j}) => {
        console.log({id, i, j})
    })
}

let gameState = new GameState(publishStateUpdate, 2,2)

io.on("connection", (socket => {
    setupHandlers(socket)

    const userId = socket.handshake["query"]["userId"]
    console.log(`${userId} connected`)

    socket.emit(MESSAGE_TYPES.GAMESTATE, gameState.getState())

}))





io.listen(8001)
