import React from 'react'

const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="


const SelectedCard = ({ card }) => {
    return (
        <div className="selectedCard">
            <img
                alt="Card Preview"
                src={!!card?.image ? `${SERVER_ADDRESS}/card-image/${card.image}` : EMPTY_IMG}
                style={{
                    width: "100%",
                }}
            />
        </div>
    )
}

export default SelectedCard;
