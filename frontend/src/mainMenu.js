import React, { useState } from 'react'

import { Paper, Typography, Button, TextField } from '@mui/material';


const MainMenu = ({ children }) => {
    const [username, setUsername] = useState("")
    const [lobbyInput, setLobbyInput] = useState("")

    function ready() {
        return false
    }


    if (ready()) {
        return children
    }
    return (
        <Paper className="mainMenu" elevation={20}>
            <Typography variant="h2" component="h1" style={{marginBottom: "2vmin"}}>MTG Board</Typography>
            <TextField  error={username.trim().length === 0} label="User name" value={username} onChange={e => setUsername(e.target.value)}/>
            <form style={{margin: "1vmin"}}>
                <Button variant="contained" style={{display: "inline-block"}}>Host</Button>
                <Typography>or</Typography>
                <Button variant="contained" style={{display: "inline-block"}}>Join</Button>
                <TextField  label="Lobby code" value={lobbyInput} onChange={e => setLobbyInput(e.target.value)}/>
            </form>
        </Paper>
    )
}

export default MainMenu;
