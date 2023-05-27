import React, { useState, useContext } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSnackbar } from 'notistack';
import { Paper, Typography, Button, TextField } from '@mui/material';

import { ServerContext } from './serverProvider';

const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]

const UserStatus = ({
    name,
    ready
}) => {
    return (
        <div
            className="userStatus"
            >
            <span
                style={{position: "relative"}}
            >
            <AccountCircleIcon
                color="primary"
                fontSize='large'
                />
            {
                ready && (
                    <CheckCircleIcon
                    color="success"
                    fontSize="small"
                    style={{
                        position:"absolute",
                        top: "-4px",
                        left: "25px"
                    }}
                    />
                    )
                }
            </span>
            <Typography>{name}</Typography>
        </div>
    )
}

const MainMenu = ({
    propagateConfirmedUser,
    propagateConfirmedLobby,
    gameState,
    children
}) => {
    const serverRef = useContext(ServerContext)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [username, setUsername] = useState("")
    const [lobbyInput, setLobbyInput] = useState("")
    const [confirmedLobby, setConfirmedLobby] = useState("")
    const [started, setStarted] = useState(false)
    const [locked, setLocked] = useState(false)
    const [deckConfig, setDeckConfig] = useState("")

    function validUsername() {
        return username.trim().length !== 0
    }

    function lobbyConfirmed() {
        return confirmedLobby.trim().length > 0
    }

    function onCreate() {
        fetch(`${SERVER_ADDRESS}/new-lobby?user=${username}`)
            .then(res => res.json())
            .then(({lobbyId}) => {
                setConfirmedLobby(lobbyId)
                setLobbyInput(lobbyId)
                propagateConfirmedLobby(lobbyId)
                propagateConfirmedUser(username)
                serverRef.current.connect(lobbyId, username)
            })
    }

    function onJoin(onError) {
        fetch(
            `${SERVER_ADDRESS}/join-lobby?lobby=${lobbyInput.trim()}&user=${username}`,
            {method: "POST"}
        )
            .then(res => res.json())
            .then(({joined, reason}) => {
                if (joined) {
                    setConfirmedLobby(lobbyInput)
                    propagateConfirmedLobby(lobbyInput)
                    propagateConfirmedUser(username)
                    serverRef.current.connect(lobbyInput, username)
                    return
                }

                onError(`Could not join lobby: ${reason}`, {
                    variant: "error"
                })
            })
    }

    function onReady(onError) {
        fetch(
            `${SERVER_ADDRESS}/player-ready?lobby=${lobbyInput.trim()}&user=${username}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({deckConfig: deckConfig})
            }
        )
            .then(res => res.json())
            .then(({ ready, reason }) => {
                if (ready) {
                    setLocked(true)
                    return
                }

                onError(`Player not ready: ${reason}`, {
                    variant: "error"
                })
            })
    }


    const hosting = lobbyConfirmed() && gameState?.users?.[username]?.hosting === true

    if (started) {
        return children
    }
    return (
        <Paper className="mainMenu" elevation={20}>
            <Typography
                variant="h2"
                component="h1"
                style={{marginBottom: "2vmin"}}
            >
                MTG Board
            </Typography>
            <TextField
                disabled={!! locked  || !! confirmedLobby}
                error={!validUsername()}
                label="User name"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <form style={{margin: "1vmin"}}>
                <Button
                    disabled={!!locked || !!confirmedLobby || !validUsername()}
                    variant="contained"
                    style={{display: "inline-block"}}
                    onClick={onCreate}
                >
                    Create
                </Button>
                <Typography>or</Typography>
                <Button
                    disabled={
                        !! locked
                        || !! confirmedLobby
                        || !validUsername()
                        || lobbyInput.trim().length <= 0
                    }
                    variant="contained"
                    style={{display: "inline-block"}}
                    onClick={() => onJoin(enqueueSnackbar)}
                >
                    Join
                </Button>
                <TextField
                    label="Lobby code"
                    disabled={!! locked || !! confirmedLobby}
                    value={lobbyInput}
                    onChange={e => setLobbyInput(e.target.value)}
                />
            </form>

            {confirmedLobby.length > 0 && (
                <div>
                    <hr /><br />
                    <div className="deckUpload">
                        <TextField
                            label="Deck Configuration"
                            multiline
                            disabled={!! locked}
                            error={deckConfig.trim().length === 0}
                            rows={8}
                            onChange={e => setDeckConfig(e.target.value)}
                        />
                        <Button
                            disabled={!! locked || deckConfig.trim().length === 0}
                            variant="contained"
                            onClick={() => onReady(enqueueSnackbar)}
                            style={{
                                "margin": "auto"
                            }}
                        >
                            Ready!
                        </Button>
                    </div>
                    <br /><hr /><br />
                    <div className="userStatuses">
                        {
                            !! gameState.users && Object.keys(gameState.users).map(u => (
                                <UserStatus
                                    key={u}
                                    name={u}
                                    ready={gameState.users[u].ready}
                                />
                            ))
                            }
                    </div>
                    <br /><hr /><br />
                    {hosting ? (
                        <Button
                            variant="contained"
                            disabled={
                                !gameState.users
                                || !Object.keys(gameState.users).every(u => gameState.users[u].ready)
                            }
                        >
                            Start!
                        </Button>
                    ) : (
                        <Typography>Only the host can start the game</Typography>
                    )}
                </div>
            )}
        </Paper>
    )
}

export default MainMenu;
