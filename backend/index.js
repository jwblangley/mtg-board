const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket => {
    console.log("A user connected")
    const userId = socket.handshake["query"]["userId"]
    socket.emit("message", `Hello ${userId}`)
}))

io.on("disconnect", (socket) => {
    console.log("A user disconnected")
})


io.listen(8001)
