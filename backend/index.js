const express = require("express")
const http = require("http")

const { Server } = require("socket.io");
require("dotenv").config()

const { GameState } = require("./gameState")

const BATTLEFIELD_WIDTH = 7
const BATTLEFIELD_HEIGHT = 4


const app = express()
const server = http.createServer(app)

const io = new Server(server, {
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

function setupSocketHandlers(socket) {
    socket.on(MESSAGE_TYPES.CARD_MOVE, ({id, i, j}) => {
        gameState.moveCard(id, i, j)
    })
}

io.on("connection", (socket => {
    setupSocketHandlers(socket)

    const userId = socket.handshake["query"]["userId"]
    console.log(`${userId} connected`)

    socket.emit(MESSAGE_TYPES.GAMESTATE, gameState.getState())

}))

app.get('/', (req, res) => {
    res.send("<h1>Hello World!</h1>")
    // res.sendFile(__dirname + '/index.html');
});


server.listen(8000, () => {
    console.log("Listening on port 8000")
})
