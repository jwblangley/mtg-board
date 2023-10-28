import { Typography } from '@mui/material'
import React from 'react'

const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]

const SelectedCard = ({ card }) => {
    return (
        <div className="selectedCard">
            {
                !!card?.image ? (
                    <img
                        alt="Card Preview"
                        src={`${SERVER_ADDRESS}/card-image/${card.image}`}
                        style={{
                            width: "100%",
                        }}
                    />
                ) : (
                    <div className="emptyCard">
                        <Typography
                            className="centeredInCard"
                            variant="h5"
                        >
                            No card selected
                        </Typography>
                    </div>
                )
            }
        </div>
    )
}

export default SelectedCard;
