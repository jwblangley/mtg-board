import ranar from "./Ranar the Ever-Watchful-khc-2.png"

import { useDrag } from 'react-dnd'

const Card = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
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
        >
            <img src={ranar} alt="card" width="146" height="208"></img>
        </div>
    );
}

export default Card;
