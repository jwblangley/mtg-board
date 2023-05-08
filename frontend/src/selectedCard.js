import React from 'react'

import ranar from "./Ranar the Ever-Watchful-khc-2.png"

const emptyImg = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="


const SelectedCard = ({ card }) => {
    return (
        <div className="selectedCard">
            <img
                alt="Card Preview"
                src={!!card?.id ? ranar : emptyImg}
                style={{
                    width: "100%",
                }}
            />
        </div>
    )
}

export default SelectedCard;