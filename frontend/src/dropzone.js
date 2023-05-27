import React, { useState } from 'react'

const preventDrag = function (e) {
    e.stopPropagation()
    e.preventDefault()
}

const Dropzone = ({
    children,
    dragEnter,
    dragLeave,
    drop
}) => {
    const [drags, setDrags] = useState(0)

    function isDraggedOver() {
        return drags > 0
    }

    return (
        <div
            onDragOver={e => {
                preventDrag(e)
            }}
            onDragEnter={e => {
                preventDrag(e)
                setDrags(prevDrags => {
                    if (dragEnter && prevDrags === 0) {
                        dragEnter()
                    }
                    return prevDrags + 1
                })
            }}
            onDragLeave={e => {
                preventDrag(e)
                setDrags(prevDrags => {
                    if (dragLeave && prevDrags - 1 === 0) {
                        dragLeave()
                    }
                    return prevDrags - 1
                })
            }}
            onDrop={e => {
                preventDrag(e)
                setDrags(0)
                drop(e.dataTransfer.files)
            }}
        >
            <div
                style={{
                    opacity: (isDraggedOver() ? "0.5" : "1"),
                    backgroundColor: (isDraggedOver() ? "darkgrey" : "initial")
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default Dropzone
