import './App.css';

import { useState } from 'react';

import Battlefield from "./battlefield"
import Library from "./library"
import { ServerProvider } from './serverProvider';
import DraggableCanvas from './draggable';


const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]
console.log(SERVER_ADDRESS)

const App = () => {
  const [user, setUser] = useState("James")
  const [battlefieldScale, setBattlefieldScale] = useState(0.5)
  const [battlefieldContent, setBattlefieldContent] = useState([[[]]])

  return (
    <ServerProvider url={SERVER_ADDRESS} userId={user} setGameState={setBattlefieldContent}>
      <DraggableCanvas>
        <div>
          <Battlefield content={battlefieldContent} scale={battlefieldScale}/>
          <Library />
        </div>
      </DraggableCanvas>
    </ServerProvider>
  );
}

export default App;
