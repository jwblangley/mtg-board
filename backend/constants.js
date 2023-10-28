const MESSAGE_TYPES = {
    GAMESTATE: "gameState",
    CARD_MOVE_HAND: "cardMoveHand",
    CARD_MOVE_BATTLEFIELD: "cardMoveBattlefield",
    CARD_MOVE_OTHER_BATTLEFIELD: "cardMoveOtherBattlefield",
    TOGGLE_TAP_CARD: "toggleTapCard"
}

const BATTLEFIELD_WIDTH = 7
const BATTLEFIELD_HEIGHT = 4
const STARTING_DECK_SIZE = 7
const MAX_STACK_SIZE = 5

module.exports = {
    MESSAGE_TYPES,
    BATTLEFIELD_WIDTH,
    BATTLEFIELD_HEIGHT,
    STARTING_DECK_SIZE,
    MAX_STACK_SIZE
}
