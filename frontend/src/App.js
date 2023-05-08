import './App.css';

import { useState } from 'react';

import Battlefield from "./battlefield"
import Library from "./library"
import { ServerProvider } from './serverProvider';
import DraggableCanvas from './draggable';
import SelectedCard from './selectedCard';
import MainMenu from './mainMenu';


const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]

const App = () => {
  const [user, setUser] = useState("unset")
  const [lobby, setLobby] = useState("unset")
  const [battlefieldScale, setBattlefieldScale] = useState(0.5)
  const [battlefieldContent, setBattlefieldContent] = useState([[[]]])
  const [selectedCard, setSelectedCard] = useState()

  return (
    <ServerProvider
      url={SERVER_ADDRESS}
      lobbyId={lobby}
      userId={user}
      setGameState={setBattlefieldContent}
    >
      <MainMenu>
        <DraggableCanvas>
            <SelectedCard card={selectedCard} />
            <Battlefield
              content={battlefieldContent}
              scale={battlefieldScale}
              setSelectedCard={setSelectedCard}
            />
            <Library />
        </DraggableCanvas>
      </MainMenu>
    </ServerProvider>
  );
}

export default App;
