import React, { useContext } from 'react'
import { Typography, Button } from '@mui/material';

import { ServerContext } from './serverProvider'

const TopBar = ({
    lobbyId,
    user,
    userViewing
}) => {
    let server = useContext(ServerContext)
    const untapAll = () => {
        server.current.untapAll(userViewing)
    }

    return (
        <div className="topBar">
            <div
                style={{
                    left: 0,
                    position: "absolute"
                }}
            >
                <Button
                    variant="contained"
                    display="inline"
                    onClick={untapAll}
                    disabled={user !== userViewing}
                >
                    Untap all
                </Button>
            </div>
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
