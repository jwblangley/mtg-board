import { io } from "socket.io-client"

class SocketIOAdapter {
    constructor(url, userId, setGameState) {
        this.socket = io(url, {
            autoConnect: false,
            query: `userId=${userId}`
        })

        this.socket.on("gameState", (gameState) => {
            console.log(gameState)
            setGameState(gameState)
        })
    }

    connect() {
        this.socket.connect()
    }
}


export default SocketIOAdapter
