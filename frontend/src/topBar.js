import React, { useContext } from 'react'
import { Typography, Button, TextField } from '@mui/material';


import { ServerContext } from './serverProvider'

const TopBar = ({
    lobbyId,
    user,
    userViewing,
    battlefieldScale,
    setBattlefieldScale
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
                <TextField
                    inputProps={{
                        type: "number",
                        min: 0,
                        max: 10,
                        step: 0.1
                    }}
                    label="Battlefield zoom"
                    size="small"
                    variant="filled"
                    value={battlefieldScale}
                    onChange={e => setBattlefieldScale(e.target.value)}
                />
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
