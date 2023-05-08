import './App.css';

import { useState } from 'react';

import Battlefield from "./battlefield"
import { ServerProvider } from './serverProvider';
import DraggableCanvas from './draggable';


const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]
console.log(SERVER_ADDRESS)

const App = () => {
  const [user, setUser] = useState("James")
  const [battlefieldContent, setBattlefieldContent] = useState([[[]]])

  return (
    <ServerProvider url={SERVER_ADDRESS} userId={user} setGameState={setBattlefieldContent}>
      <DraggableCanvas>
        <Battlefield content={battlefieldContent}>
        </Battlefield>
      </DraggableCanvas>
    </ServerProvider>
  );
}

export default App;
