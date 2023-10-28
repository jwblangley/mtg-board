import React from 'react'

import { Paper, Typography } from '@mui/material';

import { CARD_WIDTH, CARD_HEIGHT } from "./constants";



const Library = ({
    gameState,
    user,
    userViewing
}) => {

    const library = gameState?.users?.[userViewing]?.library

    return(
        <Paper
            className="library"
            elevation={10}
        >
            <div className="emptyCard"
                style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                }}
            >
                <Typography
                    variant="h5"
                >
                    {`${userViewing}'s library`}
                </Typography>
                <Typography
                    variant="h7"
                >
                    {`${library.length} card${library.length > 1 ? "s" : ""} remaining`}
                </Typography>
            </div>
        </Paper>
    )
}

export default Library;
