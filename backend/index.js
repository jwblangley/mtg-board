const express = require("express")
const http = require("http")
const cors = require("cors")

const { Server } = require("socket.io");
require("dotenv").config()

const { GameState } = require("./gameState")
const { generateId } = require("./lobbyGeneration")
const { MESSAGE_TYPES } = require("./constants")

const BATTLEFIELD_WIDTH = 7
const BATTLEFIELD_HEIGHT = 4


const corsValues = {
    origin: process.env["CORS_ALLOW"]
}

const app = express()
app.use(cors(corsValues))
const server = http.createServer(app)

const io = new Server(server, {
    cors : corsValues
});

function publishStateUpdate(lobbyId, gameState) {
    io.to(lobbyId).emit(MESSAGE_TYPES.GAMESTATE, gameState)
}


const lobbyGameStateMap = new Map()

function setupSocketHandlers(socket) {
    socket.on("disconnect", () => {
        const userId = socket.handshake.query?.userId
        const lobbyId = socket.handshake.query?.lobbyId
        console.log(`${userId} disconnected from lobby ${lobbyId}`)
    })
    socket.on(MESSAGE_TYPES.CARD_MOVE, ({id, i, j}) => {
        gameState.moveCard(id, i, j)
    })
}

io.on("connection", (socket => {
    const userId = socket.handshake.query?.userId
    const lobbyId = socket.handshake.query?.lobbyId

    socket.join(lobbyId)
    setupSocketHandlers(socket)

    console.log(`${userId} connected to lobby ${lobbyId}`)

    lobbyGameStateMap.get(lobbyId).update()
}))

// app.get("/", (req, res) => {
//     res.send("<h1>Hello World!</h1>")
//     // res.sendFile(__dirname + '/index.html');
// });

app.get("/new-lobby", (req, res) => {
    let id = ""
    while (id === "" || lobbyGameStateMap.has(id)) {
        id = generateId(6)
    }
    lobbyGameStateMap.set(id, new GameState(
        id,
        publishStateUpdate,
        BATTLEFIELD_WIDTH,
        BATTLEFIELD_HEIGHT
    ))
    console.log(`New lobby: ${id}`)
    res.json({lobbyId: id})
})


server.listen(8000, () => {
    console.log("Listening on port 8000")
})
