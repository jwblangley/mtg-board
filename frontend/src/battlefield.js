import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { Paper } from '@mui/material';

import Card from "./card"
import { CARD_WIDTH, CARD_HEIGHT, DraggableTypes, STACK_MAX, STACK_OFFSET } from './constants'
import { ServerContext } from './serverProvider'

const Cell = ({
    content,
    i,
    j,
    user,
    userViewing,
    setSelectedCard,
    disabled
}) => {
    let server = useContext(ServerContext)
    const validDrop = user === userViewing && content.length < STACK_MAX && !disabled
    const [{isOver}, drop] = useDrop(
        () => ({
            accept: validDrop ? DraggableTypes.CARD : [],
            canDrop: () => validDrop,
            drop: (monitor) => {
                server.current.moveCardToBattlefield(monitor.uuid, userViewing, i, j)
            },
            collect: (monitor) => ({
                isOver: !! monitor.isOver(),
                canDrop: !! monitor.canDrop()
            })
        })
    )


    return (
        <div
            className="battlefieldCell"
            ref={drop}
            style={{
                width: CARD_WIDTH + STACK_OFFSET * STACK_MAX,
                height: CARD_HEIGHT + STACK_OFFSET * STACK_MAX,
            }}
        >
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: "5%",
                        left: "5%",
                        width:"90%",
                        height:"90%",
                        zIndex: 10,
                        opacity: 0.5,
                        borderRadius: "10%",
                        backgroundColor: 'yellow',
                    }}
                />
            )}
            {content.map((card, stackIndex) => (<Card
                content={card}
                key={card.uuid}
                owner={userViewing}
                viewer={user}
                stackIndex={stackIndex}
                stackTotal={content.length}
                setSelectedCard={setSelectedCard}
                disabled={disabled}
            />))}
        </div>
    )
}

const Row = ({
    content,
    i,
    user,
    userViewing,
    setSelectedCard,
    disabled
}) => {
    return (
        <div
            className="battlefieldRow"
            style={{
                width: content.length * (CARD_WIDTH + STACK_OFFSET * STACK_MAX),
                height: CARD_HEIGHT + STACK_OFFSET * STACK_MAX
            }}
        >
            {content.map((cell, j) => (<Cell
                content={cell}
                i={i} j={j}
                key={`battlefieldCell-${i}-${j}`}
                user={user}
                userViewing={userViewing}
                setSelectedCard={setSelectedCard}
                disabled={disabled}
            />))}
        </div>
    )
}

const Battlefield = ({
    user,
    userViewing,
    gameState,
    scale,
    setSelectedCard,
    disabled
}) => {
    const content = gameState.users[userViewing].battlefield
    return (
        <Paper
            className="battlefield"
            elevation={10}
            onClick={(e) => {
                if (disabled) {
                    return
                }
                // Hack to detect clicking on a card: the alt text of card image
                if (e.target?.alt !== "card") {
                    setSelectedCard({})
                }
            }}
            style={disabled ? {
                width: "auto",
                height: "auto"
            }: {}}
        >
            <div style={{
                overflow: "hidden",
                padding: 10,
                width: scale * content[0].length * (CARD_WIDTH + STACK_OFFSET * STACK_MAX) + 30,
                height: scale * content.length * (CARD_HEIGHT + STACK_OFFSET * STACK_MAX) + 30,
                margin: "auto",
            }}>
                <Paper
                    elevation={20}
                    style={{
                        width: content[0].length * (CARD_WIDTH + STACK_OFFSET * STACK_MAX),
                        height: content.length * (CARD_HEIGHT + STACK_OFFSET * STACK_MAX),
                        transform: `scale(${scale})`,
                        transformOrigin: "0 0"
                    }}
                >
                    {content.map((row, i) => (<Row
                        content={row}
                        i={i}
                        key={`battlefieldRow-${i}`}
                        user={user}
                        userViewing={userViewing}
                        setSelectedCard={setSelectedCard}
                        disabled={disabled}
                    />))}
                </Paper>
            </div>
        </Paper>
    )
}

export default Battlefield;
