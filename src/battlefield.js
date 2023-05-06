import React from 'react'
import { useDrop } from 'react-dnd'

import Card from "./card"
import { DraggableTypes } from './constants'

const Cell = ({content, i, j}) => {
    const [{isOver}, drop] = useDrop(
        () => ({
            accept: DraggableTypes.CARD,
            drop: () => console.log(`drop: ${i} ${j}`),
            collect: monitor => ({
                isOver: !!monitor.isOver()
            })
        })
    )


    return (
        <div className="battlefieldCell" ref={drop}>
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 2,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                    }}
                />
            )}
            {content.map(card => (<Card key={card.id}/>))}
        </div>
    )
}

const Row = ({content, i}) => {
    return (
        <div className="battlefieldRow">
            {content.map((cell, j) => (<Cell content={cell} i={i} j={j} key={`battlefieldCell-${i}-${j}`}/>))}
        </div>
    )
}

const Battlefield = ({content}) => {
    return (
        <div className="battlefield">
            {content.map((row, i) => (<Row content={row} i={i} key={`battlefieldRow-${i}`} />))}
        </div>
    )
}

export default Battlefield;
