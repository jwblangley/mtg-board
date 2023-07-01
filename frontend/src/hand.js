import React from 'react'
import { useDrop } from 'react-dnd'

import { Paper, Typography } from '@mui/material';

import Card from "./card"

const Hand = ({
    cards,
    setSelectedCard
}) => {
    return (
        <Paper
            className="hand"
            elevation={10}
        >
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
