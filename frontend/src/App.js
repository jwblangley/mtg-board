import './App.css';

import { useState } from 'react';
import { SnackbarProvider } from 'notistack';

import Battlefield from "./battlefield"
import Library from "./library"
import { ServerProvider } from './serverProvider';
import DraggableCanvas from './draggable';
import SelectedCard from './selectedCard';
import MainMenu from './mainMenu';


const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]

const App = () => {
  const [user, setUser] = useState("")
  const [lobby, setLobby] = useState("")
  const [battlefieldScale, setBattlefieldScale] = useState(0.5)
  const [gameState, setGameState] = useState([[[]]])
  const [selectedCard, setSelectedCard] = useState()

  return (
    <ServerProvider
      url={SERVER_ADDRESS}
      setGameState={setGameState}
    >
      <SnackbarProvider>
        <MainMenu
          propagateConfirmedUser={setUser}
          propagateConfirmedLobby={setLobby}
          gameState={gameState}
        >
          <DraggableCanvas>
              <SelectedCard card={selectedCard} />
              <Battlefield
                content={gameState}
                scale={battlefieldScale}
                setSelectedCard={setSelectedCard}
              />
              <Library />
          </DraggableCanvas>
        </MainMenu>
      </SnackbarProvider>
    </ServerProvider>
  );
}

export default App;
