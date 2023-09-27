import React, { useState, useEffect } from "react";

function Jeu({ channel, setChannel }) {
  
  const [playersJoined, setPlayersJoined] = useState(false);
  const [result] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    // Cette partie vérifie si deux joueurs ont rejoint chaque fois que le canal est modifié
    setPlayersJoined(channel?.state?.watcher_count === 2);
  }, [channel]);

  // Restaurez la condition pour afficher le message d'attente si deux joueurs n'ont pas rejoint
  if (!playersJoined) {
    return <div>Waiting for other player to join...</div>;
  }
  
  return (
    <div className="gameContainer">
      <button
        onClick={async () => {
          setChannel(null);
        }}
      >
        Leave Game
      </button>
      {result.state === "won" && <div>{result.winner} Won The Game</div>}
      {result.state === "tie" && <div>Game Tied</div>}
    </div>
  );
}

export default Jeu;
