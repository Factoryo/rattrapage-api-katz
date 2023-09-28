import React, { useState, useEffect } from "react";
import Jeu from "./Jeu";

function JoinJeu({ userId }) {
  const [channel, setChannel] = useState(null);
  const BASE_URL = "http://localhost:3001";

  const joinOrCreateChannel = async () => {
    try {
      let response = await fetch(`${BASE_URL}/getAvailableGameSession`);
      if (!response.ok) {
        throw new Error("Failed to get available game session: " + response.statusText);
      }
      let data = await response.json();
      if (!data || !data._id) {
        response = await fetch(`${BASE_URL}/createGameSession`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to create game session: " + response.statusText);
        }
        data = await response.json();
      }
      setChannel({ id: data._id });
    } catch (error) {
      console.error("Failed to join or create game session:", error);
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
        <Jeu channel={channel} setChannel={setChannel} />
      ) : (
        <div className="joinGame">
          <button onClick={joinOrCreateChannel}>Rejoindre ou créer une session</button>
        </div>
      )}
    </>
  );
}

export default JoinJeu;
