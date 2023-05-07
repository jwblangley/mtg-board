import { io } from "socket.io-client"

class SocketIOAdapter {
    constructor(url) {
        this.socket = io(url)
    }
}


export default SocketIOAdapter
