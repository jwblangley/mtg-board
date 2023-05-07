import './App.css';

import { useEffect, useState } from 'react';

import SocketIOAdapter from './socketioAdapter';

import Board from "./board"
import Battlefield from "./battlefield"


function generateEmptyBattlefield(width, height) {
  return Array(height).fill().map(() => Array(width).fill([]))
}

// TODO @James: Change once environment is set up
const server = new SocketIOAdapter("http://localhost:8001")

// Set up test content
const testContent = generateEmptyBattlefield(2, 2)
testContent[0][0] = [
  {id: "a"},
  {id: "b"},
  {id: "c"},
  {id: "d"},
  {id: "e"}
]

const App = () => {

  const [battlefieldContent, setBattlefieldContent] = useState(generateEmptyBattlefield(1, 1))

  useEffect(() => {
    setBattlefieldContent(testContent)
  }, [testContent])




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
