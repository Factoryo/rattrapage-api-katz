import React, { useState, useEffect } from "react";

function Jeu({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(false);
  const [result] = useState({ winner: "none", state: "none" });
  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    const checkPlayersJoined = async () => {
      try {
        const response = await fetch(`${BASE_URL}/gameSessionStatus/${channel.id}`);
        if (!response.ok) { 
          throw new Error("Failed to get game session status: " + response.statusText);
        }
        const data = await response.json();

        // Ajout du log ici pour afficher la réponse du serveur
        console.log("Réponse du serveur:", data);

        if (data.players && data.players.length === 2) {
          setPlayersJoined(true);
        }
      } catch (error) {
        console.error("Failed to get game session status:", error);
      }
    };

    const interval = setInterval(checkPlayersJoined, 2000);
    return () => clearInterval(interval);
  }, [channel]);

  if (!playersJoined) {
    return <div>En attente de l'autre joueur...</div>;
  }

  return (
    <div className="gameContainer">
      <h2>Jeu</h2>
      <button
        onClick={async () => {
          setChannel(null);
        }}
      >
        Quitter Le jeu
      </button>
      {result.state === "won" && <div>{result.winner} Gagné La Manche</div>}
      {result.state === "tie" && <div>Jeu Égal</div>}
    </div>
  );
}

export default Jeu;
