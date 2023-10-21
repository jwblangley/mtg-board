import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { Paper } from '@mui/material';


import Card from "./card"
import { ServerContext } from './serverProvider'
import { DraggableTypes } from './constants'


const Hand = ({
    cards,
    currentUser,
    setSelectedCard
}) => {
    let server = useContext(ServerContext)
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: DraggableTypes.CARD,
            canDrop: () => true,
            drop: (monitor) => {
                server.current.moveCardToHand(monitor.uuid, currentUser)
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        })
    )

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
                    <Card
                        content={card}
                        noStack
                        stackIndex={1}
                        stackTotal={1}
                        setSelectedCard={setSelectedCard}
                    />
                </div>
            ))}
        </Paper>
    )
}

export default Hand;
