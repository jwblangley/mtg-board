import { io } from "socket.io-client"

const MESSAGE_TYPES = {
    GAMESTATE: "gameState",
    CARD_MOVE: "cardMove"
}

class SocketIOAdapter {
    constructor(url, userId, setGameState) {
        this.socket = io(url, {
            autoConnect: false,
            query: `userId=${userId}`
        })

        this.socket.on(MESSAGE_TYPES.GAMESTATE, (gameState) => {
            console.log(gameState)
            setGameState(gameState)
        })
    }

    connect() {
        this.socket.connect()
        // this.socket.emit(MESSAGE_TYPES.CARD_MOVE, {test: "test"})
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
