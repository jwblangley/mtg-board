import { useEffect, useRef, createContext } from "react"
import SocketIOAdapter from "./socketioAdapter"


const ServerContext = createContext({})

const ServerProvider = ({children, url, userId, setGameState}) => {
    const adapter = useRef(undefined)
    useEffect(() => {
        if (adapter.current === undefined) {
            adapter.current = new SocketIOAdapter(url, userId, setGameState)
            adapter.current.connect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ServerContext.Provider value={adapter}>{children}</ServerContext.Provider>
    )
}

export {ServerContext, ServerProvider}
