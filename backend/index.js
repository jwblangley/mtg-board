const express = require("express")
const http = require("http")
const cors = require("cors")
const bodyParser = require('body-parser')

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
app.use(bodyParser.json())
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

    gameState = lobbyGameStateMap.get(lobbyId)
    if (!!gameState) {
        gameState.update()
    }
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

    let userId = req.query.user
    lobbyGameStateMap.get(id).addUser(userId, hosting=true)
    res.json({lobbyId: id})
})

app.post("/join-lobby", (req, res) => {
    let lobbyId = req.query.lobby
    let userId = req.query.user

    if (!lobbyGameStateMap.has(lobbyId)) {
        console.log(`${userId} tried to join non-existent lobby: ${lobbyId}`)
        res.json({joined: false, reason: "Lobby does not exist"})
        return
    }

    gameState = lobbyGameStateMap.get(lobbyId)
    if (gameState.users.has(userId)) {
        console.log(`${userId} rejoined lobby: ${lobbyId}`)
        gameState.update()
        res.json({joined: true})
        return
    }
    if (gameState.started) {
        console.log(`New user: ${userId} denied entry to started lobby ${lobbyId}`)
        res.json({joined: false, reason: "New users cannot join started lobbies"})
        return
    }

    gameState.addUser(userId)
    res.json({joined: true})
})

app.post("/player-ready", (req, res) => {
    let userId = req.query.user
    let lobbyId = req.query.lobby

    console.log(req.body["deckConfig"])

    let gameState = lobbyGameStateMap.get(lobbyId)
    if (!!gameState) {
        // TODO @James: Run checks
        gameState.users.get(userId).ready = true
        gameState.update()
        res.json({ready: true})
        return
    }
    res.json({ready: false, reason: "Lobby not found"})
})


server.listen(8000, () => {
    console.log("Listening on port 8000")
})
