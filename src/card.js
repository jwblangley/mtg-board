import ranar from "./Ranar the Ever-Watchful-khc-2.png"

import { useDrag } from 'react-dnd'
import { CARD_WIDTH, CARD_HEIGHT, STACK_OFFSET, STACK_MAX, DraggableTypes } from "./constants";

const Card = ({stackIndex, stackTotal}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: DraggableTypes.CARD,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={drag}
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                top: `${STACK_OFFSET / 2 + (STACK_MAX - stackTotal) * (STACK_OFFSET / 2) + (STACK_OFFSET * stackIndex)}px`,
                left: `${STACK_OFFSET / 2 + (STACK_MAX - stackTotal) * (STACK_OFFSET / 2) + (STACK_OFFSET * stackIndex)}px`,
                zIndex: `${stackIndex}`,
                opacity: `${(isDragging ? 0.5 : 1) * (0.6 + 0.4 * (stackTotal === 1 ? 1 : (stackIndex/(stackTotal - 1))))}`,
                border: `${isDragging ? "solid red 5px" : ""}`,
                borderRadius: `${isDragging ? "12px" : ""}`
            }}
            className="card"
        >
            <img src={ranar} alt="card" width="100%" height="100%"></img>
        </div>
    );
}

export default Card;
