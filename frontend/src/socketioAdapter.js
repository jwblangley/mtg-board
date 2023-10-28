import { io } from "socket.io-client"

const MESSAGE_TYPES = {
    GAMESTATE: "gameState",
    CARD_MOVE_HAND: "cardMoveHand",
    CARD_MOVE_BATTLEFIELD: "cardMoveBattlefield",
    CARD_MOVE_OTHER_BATTLEFIELD: "cardMoveOtherBattlefield",
    TOGGLE_TAP_CARD: "toggleTapCard"
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

    moveCardToHand(cardUuid, userId) {
        this.socket.emit(MESSAGE_TYPES.CARD_MOVE_HAND, {
            cardUuid: cardUuid,
            userId: userId
        })
    }

    moveCardToBattlefield(cardUuid, userId, i, j) {
        this.socket.emit(MESSAGE_TYPES.CARD_MOVE_BATTLEFIELD, {
            cardUuid: cardUuid,
            userId: userId,
            i: i,
            j: j
        })
    }

    moveCardToOtherBattlefield(cardUuid, targetUserId) {
        this.socket.emit(MESSAGE_TYPES.CARD_MOVE_OTHER_BATTLEFIELD, {
            cardUuid: cardUuid,
            userId: targetUserId
        })
    }

    toggleTapCard(cardUuid) {
        this.socket.emit(MESSAGE_TYPES.TOGGLE_TAP_CARD ,{
            cardUuid: cardUuid
        })
    }
}


export default SocketIOAdapter
