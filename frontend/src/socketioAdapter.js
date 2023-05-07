import { io } from "socket.io-client"

class SocketIOAdapter {
    constructor(url, userId) {
        this.socket = io(url, {query: `userId=${userId}`})

        this.socket.on("message", (msg) => {
            console.log(`Message received: ${msg}`)
        })
    }
}


export default SocketIOAdapter
