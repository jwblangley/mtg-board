import React from 'react'
import { useDrop } from 'react-dnd'

import Card from "./card"
import { CARD_WIDTH, CARD_HEIGHT, DraggableTypes, STACK_MAX, STACK_OFFSET } from './constants'

const Cell = ({content, i, j}) => {
    const [{isOver}, drop] = useDrop(
        () => ({
            accept: content.length === STACK_MAX ? [] : DraggableTypes.CARD,
            drop: () => console.log(`drop: ${i} ${j}`),
            collect: monitor => ({
                isOver: !!monitor.isOver()
            })
        })
    )


    return (
        <div
            className="battlefieldCell"
            ref={drop}
            style={{
                width: CARD_WIDTH + STACK_OFFSET * STACK_MAX,
                height: CARD_HEIGHT + STACK_OFFSET * STACK_MAX
            }}
        >
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: "5%",
                        left: "5%",
                        width:"90%",
                        height:"90%",
                        zIndex: 99,
                        opacity: 0.5,
                        borderRadius: "10%",
                        backgroundColor: 'yellow',
                    }}
                />
            )}
            {content.map((card, stackIndex) => (<Card key={card.id} stackIndex={stackIndex} stackTotal={content.length}/>))}
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