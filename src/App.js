import './App.css';

import { useEffect, useState } from 'react';


import Board from "./board"
import Battlefield from "./battlefield"
import Card from "./card"


function generateEmptyBattlefield(width, height) {
  return Array(height).fill().map(() => Array(width).fill([]))
}


const App = () => {
  const battlefieldWidth = 2
  const battlefieldHeight = 2
  const [battlefieldContent, setBattlefieldContent] = useState(generateEmptyBattlefield(battlefieldWidth, battlefieldHeight))

  // Set up test content
  const testContent = generateEmptyBattlefield(battlefieldWidth, battlefieldHeight)
  testContent[0][0] = [
    {id: "a"},
    {id: "b"},
    {id: "c"},
    {id: "d"},
    {id: "e"}
  ]
  useEffect(() => {
    setBattlefieldContent(testContent)
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
