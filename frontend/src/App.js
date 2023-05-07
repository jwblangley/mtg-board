import './App.css';

import { useEffect, useState } from 'react';

import SocketIOAdapter from './socketioAdapter';

import Board from "./board"
import Battlefield from "./battlefield"


function generateEmptyBattlefield(width, height) {
  return Array(height).fill().map(() => Array(width).fill([]))
}


const App = () => {
  const [user, setUser] = useState("James")
  const [battlefieldContent, setBattlefieldContent] = useState(generateEmptyBattlefield(1, 1))

  // TODO @James: Change once environment is set up
  let server = new SocketIOAdapter("http://localhost:8001", user, setBattlefieldContent)

  useEffect(() => {
    server.connect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Board>
        <Battlefield content={battlefieldContent}>
        </Battlefield>
      </Board>
    </div>
  );
}

export default App;
