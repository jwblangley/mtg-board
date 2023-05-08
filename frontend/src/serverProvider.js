import { useEffect, useRef, createContext } from "react"
import SocketIOAdapter from "./socketioAdapter"


const ServerContext = createContext({})

const ServerProvider = ({children, url, setGameState}) => {
    const adapter = useRef(undefined)
    useEffect(() => {
        if (adapter.current === undefined) {
            adapter.current = new SocketIOAdapter(url, setGameState)
        }
        return () => {
            adapter.current = undefined
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ServerContext.Provider value={adapter}>{children}</ServerContext.Provider>
    )
}

export {ServerContext, ServerProvider}
