import React, { useState, useContext } from 'react'

import { useSnackbar } from 'notistack';

import { Paper, Typography, Button, TextField } from '@mui/material';
import { ServerContext } from './serverProvider';

const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]

const MainMenu = ({
    propagateConfirmedUser,
    propagateConfirmedLobby,
    children
}) => {
    const [username, setUsername] = useState("")
    const [lobbyInput, setLobbyInput] = useState("")
    const [confirmedLobby, setConfirmedLobby] = useState("")
    const [hosting, setHosting] = useState(false)
    const [started, setStarted] = useState(false)
    const serverRef = useContext(ServerContext)

    function validUsername() {
        return username.trim().length !== 0
    }

    // function ready() {
    //     return false
    //     // return confirmedLobby.trim().length > 0
    // }

    function onCreate() {
        fetch(`${SERVER_ADDRESS}/new-lobby?user=${username}`)
            .then(res => res.json())
            .then(({lobbyId}) => {
                setConfirmedLobby(lobbyId)
                setLobbyInput(lobbyId)
                propagateConfirmedLobby(lobbyId)
                propagateConfirmedUser(username)
                setHosting(true)
                serverRef.current.connect(lobbyId, username)
            })
    }

    function onJoin(onError) {
        fetch(`${SERVER_ADDRESS}/join-lobby?lobby=${lobbyInput.trim()}&user=${username}`, {method: "POST"})
            .then(res => res.json())
            .then(({joined, reason}) => {
                if (joined) {
                    setConfirmedLobby(lobbyInput)
                    propagateConfirmedLobby(lobbyInput)
                    propagateConfirmedUser(username)
                    return
                }

                onError(`Could not join lobby: ${reason}`, {
                    variant: "error"
                })
            })
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    if (started) {
        return children
    }
    return (
        <Paper className="mainMenu" elevation={20}>
            <Typography variant="h2" component="h1" style={{marginBottom: "2vmin"}}>MTG Board</Typography>
            <TextField  disabled={!!confirmedLobby} error={!validUsername()} label="User name" value={username} onChange={e => setUsername(e.target.value)}/>
            <form style={{margin: "1vmin"}}>
                <Button
                    disabled={!!confirmedLobby || !validUsername()}
                    variant="contained"
                    style={{display: "inline-block"}}
                    onClick={onCreate}
                >
                    Create
                </Button>
                <Typography>or</Typography>
                <Button
                    disabled={!!confirmedLobby || !validUsername() || lobbyInput.trim().length <= 0}
                    variant="contained"
                    style={{display: "inline-block"}}
                    onClick={() => onJoin(enqueueSnackbar)}
                >
                    Join
                </Button>
                <TextField
                    label="Lobby code"
                    disabled={!!confirmedLobby}
                    value={lobbyInput}
                    onChange={e => setLobbyInput(e.target.value)}
                />
            </form>
        </Paper>
    )
}

export default MainMenu;
