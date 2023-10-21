import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { Paper, Typography } from '@mui/material';


import Card from "./card"
import { ServerContext } from './serverProvider'
import { DraggableTypes } from './constants'
import Battlefield from "./battlefield"


const OtherBattlefields = ({
    gameState,
    user,
    viewingUser,
    setViewingUser
}) => {
    let server = useContext(ServerContext)
    // const [{ isOver }, drop] = useDrop(
    //     () => ({
    //         accept: DraggableTypes.CARD,
    //         canDrop: () => true,
    //         drop: (monitor) => {
    //             server.current.moveCardToHand(monitor.uuid, currentUser)
    //         },
    //         collect: (monitor) => ({
    //             isOver: !!monitor.isOver(),
    //             canDrop: !!monitor.canDrop()
    //         })
    //     })
    // )

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
                <div
                    className="otherBattlefield"
                    onClick={() => {
                        setViewingUser(u)
                    }}
                >
                    <Typography variant="h6">
                        {u}
                    </Typography>
                    <Battlefield
                        user={user}
                        viewingUser={u}
                        gameState={gameState}
                        scale={0.15}
                        setSelectedCard={null}
                        disabled
                    />
                </div>
            ))}
        </Paper>
    )
}

export default OtherBattlefields;
