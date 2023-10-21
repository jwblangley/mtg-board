import { Typography } from '@mui/material';
import React from 'react'

const TopBar = ({
    lobbyId,
    user,
    userViewing
}) => {
    return (
        <div className="topBar">
            <div
                style={{
                    right: 0,
                    position: "absolute"
                }}
            >
                <Typography display="inline">
                    {`Lobby: ${lobbyId}`}
                </Typography>
                <Typography display="inline">
                    {`User: ${user}`}
                </Typography>
                <Typography display="inline">
                    {`Current board: ${userViewing}`}
                </Typography>
            </div>
        </div>
    )
}

export default TopBar;
