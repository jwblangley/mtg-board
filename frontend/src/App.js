import './App.css';

import { useState } from 'react';

import Battlefield from "./battlefield"
import Library from "./library"
import { ServerProvider } from './serverProvider';
import DraggableCanvas from './draggable';
import SelectedCard from './selectedCard';


const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]

const App = () => {
  const [user, setUser] = useState("James")
  const [battlefieldScale, setBattlefieldScale] = useState(0.5)
  const [battlefieldContent, setBattlefieldContent] = useState([[[]]])
  const [selectedCard, setSelectedCard] = useState()

  return (
    <ServerProvider
      url={SERVER_ADDRESS}
      userId={user}
      setGameState={setBattlefieldContent}
    >
      <DraggableCanvas>
          <SelectedCard card={selectedCard} />
          <Battlefield
            content={battlefieldContent}
            scale={battlefieldScale}
            setSelectedCard={setSelectedCard}
          />
          <Library />
      </DraggableCanvas>
    </ServerProvider>
  );
}

export default App;
