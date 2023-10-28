import React, { useContext } from 'react'

import { Paper, Typography, Button } from '@mui/material';

import { ServerContext } from './serverProvider'
import { CARD_WIDTH, CARD_HEIGHT } from "./constants";


const Library = ({
    gameState,
    user,
    userViewing
}) => {
    const library = gameState?.users?.[userViewing]?.library
    let server = useContext(ServerContext)

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
                    {`${library.length} card${library.length !== 1 ? "s" : ""} remaining`}
                </Typography>
                <Button
                    variant="contained"
                    disabled={user !== userViewing || library.length === 0}
                    onClick={() => {
                        server.current.drawCard(userViewing)
                    }}
                >
                    Draw card
                </Button>
            </div>
        </Paper>
    )
}

export default Library;
