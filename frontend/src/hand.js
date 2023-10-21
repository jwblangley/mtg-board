import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { Paper, Typography } from '@mui/material';


import Card from "./card"
import { ServerContext } from './serverProvider'
import { CARD_HEIGHT, CARD_WIDTH, DraggableTypes } from './constants'


const Hand = ({
    gameState,
    user,
    userViewing,
    setSelectedCard
}) => {
    let server = useContext(ServerContext)
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: user === userViewing ? DraggableTypes.CARD : [],
            canDrop: () => user === userViewing,
            drop: (monitor) => {
                server.current.moveCardToHand(monitor.uuid, userViewing)
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        })
    )

    const cards = gameState?.users?.[userViewing]?.hand

    return (
        <Paper
            className="hand"
            elevation={10}
            ref={drop}
            onClick={(e) => {
                // Hack to detect clicking on a card: the alt text of card image
                if (e.target?.alt !== "card") {
                    setSelectedCard({})
                }
            }}
        >
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: "5%",
                        left: "5%",
                        width: "90%",
                        height: "90%",
                        zIndex: 10,
                        opacity: 0.5,
                        borderRadius: "10%",
                        backgroundColor: 'yellow',
                    }}
                />
            )}
            {cards.map(card => (
                <div
                    key={card.uuid}
                    style={{
                        display: "inline-block",
                        margin: "0 0.5vw"
                    }}
                >
                    {user === userViewing ? (
                        <Card
                            content={card}
                            owner={userViewing}
                            viewer={user}
                            noStack
                            stackIndex={1}
                            stackTotal={1}
                            setSelectedCard={setSelectedCard}
                        />
                    ) : (
                        <div
                            className="emptyCard"
                            style={{
                                width: CARD_WIDTH,
                                height: CARD_HEIGHT
                            }}
                        >
                            <Typography
                                variant="h5"
                            >
                                {`${userViewing}'s hand`}
                            </Typography>
                        </div>
                    )}
                </div>
            ))}
        </Paper>
    )
}

export default Hand;
