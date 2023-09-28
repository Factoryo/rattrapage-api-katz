import React, { useState, useEffect } from "react";
import Jeu from "./Jeu";

function JoinJeu({ userId }) {
  const [channel, setChannel] = useState(null);
  const [rivalUsername, setRivalUsername] = useState("");
  const BASE_URL = "http://localhost:3001";

  const createChannel = async () => {
    try {
      const response = await fetch(`${BASE_URL}/createGameSession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) { 
        throw new Error("Failed to create game session: " + response.statusText);
      }
      const data = await response.json();
      const newChannel = {
        id: data._id,
        name: rivalUsername,
      };
      setChannel(newChannel);
    } catch (error) {
      console.error("Failed to create game session:", error);
    }
  };

  useEffect(() => {
    if (channel) {
      const joinGame = async () => {
        try {
          const response = await fetch(`${BASE_URL}/joinGameSession`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId: channel.id,
              userId: userId,
            }),
          });
          if (!response.ok) { 
            throw new Error("Failed to join game session: " + response.statusText);
          }
        } catch (error) {
          console.error("Failed to join game session:", error);
        }
      };
      joinGame();
    }
  }, [channel, userId]);

  return (
    <>
      {channel ? (
        <div>
          <Jeu channel={channel} setChannel={setChannel} />
        </div>
      ) : (
        <div className="joinGame">
          <h4>Création de session de jeu</h4>
          <input
            placeholder="Pseudonyme du rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}>Joindre la session/créer une nouvelle session</button>
        </div>
      )}
    </>
  );
}

export default JoinJeu;
