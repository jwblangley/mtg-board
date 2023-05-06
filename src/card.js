import ranar from "./Ranar the Ever-Watchful-khc-2.png"

import { useDrag } from 'react-dnd'
import { DraggableTypes } from "./constants";

const Card = () => {
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
                opacity: isDragging ? 0.5 : 1
            }}
            className="card"
        >
            <img src={ranar} alt="card" width="100%" height="100%"></img>
        </div>
    );
}

export default Card;
