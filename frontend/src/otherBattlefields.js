import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { Paper, Typography } from '@mui/material';

import { ServerContext } from './serverProvider'
import { DraggableTypes } from './constants'
import Battlefield from "./battlefield"

const OtherBattlefield = ({
    gameState,
    user,
    viewingUser,
    setViewingUser
}) => {
    let server = useContext(ServerContext)
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: DraggableTypes.CARD,
            canDrop: () => true,
            drop: (monitor) => {
                server.current.moveCardToOtherBattlefield(monitor.uuid, viewingUser)
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        })
    )

    return (
        <div
            className="otherBattlefield"
            onClick={() => {
                setViewingUser(viewingUser)
            }}
            ref={drop}
        >
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: "5%",
                        left: "5%",
                        width: "90%",
                        height: "90%",
                        zIndex: 10,
                        opacity: 0.5,
                        borderRadius: "10%",
                        backgroundColor: 'yellow',
                    }}
                />
            )}
            <Typography variant="h6">
                {viewingUser}
            </Typography>
            <Battlefield
                user={user}
                viewingUser={viewingUser}
                gameState={gameState}
                scale={0.15}
                setSelectedCard={null}
                disabled
            />
        </div>
    )
}


const OtherBattlefields = ({
    gameState,
    user,
    viewingUser,
    setViewingUser
}) => {
    return (
        <Paper
            className="otherBattlefields"
            elevation={10}
            onClick={(e) => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation();
            }}
        >
            {Object.keys(gameState.users).filter(u => u !== viewingUser).map(u => (
                <OtherBattlefield
                    key={`other-battlefield-${u}`}
                    gameState={gameState}
                    user={user}
                    viewingUser={u}
                    setViewingUser={setViewingUser}
                />
            ))}
        </Paper>
    )
}

export default OtherBattlefields;
