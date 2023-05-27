import { io } from "socket.io-client"

const MESSAGE_TYPES = {
    GAMESTATE: "gameState",
    CARD_MOVE: "cardMove"
}

class SocketIOAdapter {
    constructor(url, setGameState) {
        this.url = url
        this.setGameState = setGameState
    }

    connect(lobbyId, userId) {
        this.socket = io(this.url, {
            autoConnect: false,
            query: `lobbyId=${lobbyId}&userId=${userId}`
        })

        this.socket.connect()

        this.socket.on(MESSAGE_TYPES.GAMESTATE, (gameState) => {
            this.setGameState(gameState)
        })

        this.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }

    moveCard(id, i, j) {
        this.socket.emit(MESSAGE_TYPES.CARD_MOVE, {
            id: id,
            i: i,
            j: j
        })
    }
}


export default SocketIOAdapter
