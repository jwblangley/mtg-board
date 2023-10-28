import { useDrag } from 'react-dnd'
import { CARD_WIDTH, CARD_HEIGHT, STACK_OFFSET, STACK_MAX, DraggableTypes } from "./constants";

const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]


const Card = ({
        content,
        owner,
        viewer,
        stackIndex,
        stackTotal,
        setSelectedCard,
        noStack,
        disabled
    }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        item: content,
        type: DraggableTypes.CARD,
        collect: (monitor) => ({
            item: monitor.getItem(),
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: (monitor) => (owner === viewer && !disabled)
    }))


    function clickHandler(e) {
        if (disabled) {
            return
        }
        e.preventDefault()
        setSelectedCard(content)
    }

    return (
        <div
            ref={drag}
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                top: noStack ? "0px" : `${STACK_OFFSET / 2 + (STACK_MAX - stackTotal) * (STACK_OFFSET / 2) + (STACK_OFFSET * stackIndex)}px`,
                left: noStack ? "0px" : `${STACK_OFFSET / 2 + (STACK_MAX - stackTotal) * (STACK_OFFSET / 2) + (STACK_OFFSET * stackIndex)}px`,
                zIndex: `${stackIndex}`,
                opacity: `${(isDragging ? 0.5 : 1) * (0.6 + 0.4 * (stackTotal === 1 ? 1 : (stackIndex/(stackTotal - 1))))}`,
                border: `${isDragging ? "solid red 5px" : ""}`,
                borderRadius: `${isDragging ? "12px" : ""}`,
                position: noStack ? "initial" : "absolute"
            }}
            className={`gameCard ${content.tapped ? "tapped" : ""}`}
            onClick={clickHandler}
        >
            <img src={`${SERVER_ADDRESS}/card-image/${content.image}`} alt="card" width="100%" height="100%"></img>
        </div>
    );
}

export default Card;
