import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { Paper } from '@mui/material';


import Card from "./card"
import { ServerContext } from './serverProvider'
import { DraggableTypes } from './constants'


const OtherBattlefields = ({
    gameState,
    user
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
        >
        </Paper>
    )
}

export default OtherBattlefields;
