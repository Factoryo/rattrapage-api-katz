import React, { useState, useEffect } from "react";
import Jeu from "./Jeu";

function JoindreJeu({ userId }) {
  const [channel, setChannel] = useState(null);
  const BASE_URL = "http://localhost:3001";
  
  /* Pour récupérer une session de jeu ou en créer une */
  const tenterRejoindreOuCreerSession = async () => {
    try {
      let response = await fetch(`${BASE_URL}/getSessionJeuDisponible`);

      if (!response.ok) {
        throw new Error("Echec a recuperer session dispo : " + response.statusText);
      }

      let sessionData = await response.json();

      if (!sessionData || !sessionData._id) {
        response = await fetch(`${BASE_URL}/CreaSessionJeu`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Echec lors de la crea de session : " + response.statusText);
        }

        sessionData = await response.json();
      }

      setChannel({ id: sessionData._id });

    } catch (error) {
      console.error("Echec a joindre et a créer une session : ", error);
    }
  };

  useEffect(() => {
    if (channel) {
      const rejoindreSessionJeu = async () => {
        try {
          const response = await fetch(`${BASE_URL}/joinSessionJeu`, {
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
            throw new Error("Echec a joindre la session : " + response.statusText);
          }

        } catch (error) {
          console.error("Echec a joindre la session : ", error);
        }
      };
      
      rejoindreSessionJeu();
    }
  }, [userId, channel]);

  return (
    <>
      {channel ? (
        <Jeu channel={channel} setChannel={setChannel} />
      ) : (
        <div className="JoinJeu">
          <button onClick={tenterRejoindreOuCreerSession}>
            Rejoindre ou créer une session
          </button>
        </div>
      )}
    </>
  );
}

export default JoindreJeu;
