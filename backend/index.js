const { Server } = require("socket.io");

const { GameState } = require("./gameState")

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

const MESSAGE_TYPES = {
    GAMESTATE: "gameState"
}

function publishStateUpdate(gameState) {
    io.emit(MESSAGE_TYPES.GAMESTATE, gameState)
}

let gameState = new GameState(publishStateUpdate, 2,2)

io.on("connection", (socket => {
    console.log("A user connected")
    const userId = socket.handshake["query"]["userId"]
    socket.emit(MESSAGE_TYPES.GAMESTATE, gameState.getState())
}))

io.on("disconnect", (socket) => {
    console.log("A user disconnected")
})


io.listen(8001)
