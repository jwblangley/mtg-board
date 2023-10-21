import './App.css';

import { useState } from 'react';
import { SnackbarProvider } from 'notistack';

import Battlefield from "./battlefield"
import OtherBattlefields from "./otherBattlefields"
import Hand from "./hand"
import Library from "./library"
import { ServerProvider } from './serverProvider';
import DraggableCanvas from './draggable';
import SelectedCard from './selectedCard';
import MainMenu from './mainMenu';
import TopBar from './topBar';


const SERVER_ADDRESS = process.env["REACT_APP_SERVER_ADDRESS"]

const App = () => {
  const [user, setUser] = useState("")
  const [viewingUser, setViewingUser] = useState("")
  const [lobby, setLobby] = useState("")
  const [battlefieldScale, setBattlefieldScale] = useState(0.5)
  const [gameState, setGameState] = useState({})
  const [selectedCard, setSelectedCard] = useState()

  if (process.env["REACT_APP_DEBUG"] === "true") {
    console.log(gameState)
  }

  return (
    <ServerProvider
      url={SERVER_ADDRESS}
      setGameState={setGameState}
    >
      <SnackbarProvider>
        <MainMenu
          propagateConfirmedUser={u => {
            setUser(u)
            setViewingUser(u)
          }}
          propagateConfirmedLobby={setLobby}
          gameState={gameState}
        >
          <TopBar
            lobbyId={lobby}
            user={user}
            viewingUser={viewingUser}
          />
          <DraggableCanvas>
            <div className="fullWidth">
              <SelectedCard card={selectedCard} />
              <Battlefield
                user={user}
                viewingUser={viewingUser}
                gameState={gameState}
                scale={battlefieldScale}
                setSelectedCard={setSelectedCard}
              />
              <OtherBattlefields
                user={user}
                gameState={gameState}
                viewingUser={viewingUser}
                setViewingUser={setViewingUser}
              />
            </div>
            <div className="fullWidth">
              <Library />
              <Hand
                gameState={gameState}
                user={user}
                cards={gameState?.users?.[user]?.hand}
                viewingUser={viewingUser}
                setSelectedCard={setSelectedCard}
              />
            </div>
          </DraggableCanvas>
        </MainMenu>
      </SnackbarProvider>
    </ServerProvider>
  );
}

export default App;
