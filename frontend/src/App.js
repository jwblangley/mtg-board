import './App.css';

import { useState } from 'react';

import Board from "./board"
import Battlefield from "./battlefield"
import { ServerProvider } from './serverProvider';


function generateEmptyBattlefield(width, height) {
  return Array(height).fill().map(() => Array(width).fill([]))
}


const App = () => {
  const [user, setUser] = useState("James")
  const [battlefieldContent, setBattlefieldContent] = useState(generateEmptyBattlefield(1, 1))

  // TODO @James: Change once environment is set up
  // let server = new SocketIOAdapter("http://localhost:8001", user, setBattlefieldContent)

  // useEffect(() => {
  //   server.connect()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <ServerProvider url="http://localhost:8001" userId={user} setGameState={setBattlefieldContent}>
      <Board>
        <Battlefield content={battlefieldContent}>
        </Battlefield>
      </Board>
    </ServerProvider>
  );
}

export default App;
