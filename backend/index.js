const { Server } = require("socket.io");

const { GameState } = require("./gameState")

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

let gameState = new GameState(2,2)

io.on("connection", (socket => {
    console.log("A user connected")
    const userId = socket.handshake["query"]["userId"]
    socket.emit("gameState", gameState.getState())
}))

io.on("disconnect", (socket) => {
    console.log("A user disconnected")
})


io.listen(8001)
