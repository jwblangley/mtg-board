import './App.css';

import { useEffect, useState } from 'react';

import SocketIOAdapter from './socketioAdapter';

import Board from "./board"
import Battlefield from "./battlefield"


function generateEmptyBattlefield(width, height) {
  return Array(height).fill().map(() => Array(width).fill([]))
}

// TODO @James: Change once environment is set up

const App = () => {
  const [battlefieldContent, setBattlefieldContent] = useState(generateEmptyBattlefield(1, 1))

  let server = new SocketIOAdapter("http://localhost:8001", "James", setBattlefieldContent)
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
