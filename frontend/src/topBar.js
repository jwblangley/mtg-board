import { Typography } from '@mui/material';
import React from 'react'

const TopBar = ({
    lobbyId,
    user,
    viewingUser
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
                    {`Current board: ${viewingUser}`}
                </Typography>
            </div>
        </div>
    )
}

export default TopBar;
