import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Carre from "./Carre";
import { Patterns } from "../PatternsGagnants";
function Morpion({ result, setResult }) {
  const [morpion, setMorpion] = useState(["", "", "", "", "", "", "", "", ""]);
  const [joueur, setJoueur] = useState("X");
  const [tour, setTour] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    checkSiEgal();
    checkGagne();
  }, [morpion]);
  const chooseCarre = async (carre) => {
    if (tour === joueur && morpion[carre] === "") {
      setTour(joueur === "X" ? "O" : "X");

      await channel.sendEvent({
        type: "game-move",
        data: { carre, joueur },
      });
      setMorpion(
        morpion.map((val, idx) => {
          if (idx === carre && val === "") {
            return joueur;
          }
          return val;
        })
      );
    }
  };

  const checkGagne = () => {
    Patterns.forEach((currPattern) => {
      const premierJoueur = morpion[currPattern[0]];
      if (premierJoueur == "") return;
      let patternGagnantTrouve = true;
      currPattern.forEach((idx) => {
        if (morpion[idx] != premierJoueur) {
          patternGagnantTrouve = false;
        }
      });

      if (patternGagnantTrouve) {
        setResult({ winner: morpion[currPattern[0]], state: "won" });
      }
    });
  };

  const checkSiEgal = () => {
    let filled = true;
    morpion.forEach((carre) => {
      if (carre == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "aucun", state: "egal" });
    }
  };

  channel.on((event) => {
    if (event.type == "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setJoueur(currentPlayer);
      setTour(currentPlayer);
      setMorpion(
        morpion.map((val, idx) => {
          if (idx === event.data.carre && val === "") {
            return event.data.player;
          }
          return val;
        })
      );
    }
  });

  return (
    <div className="morpion">
      <div className="ligne">
        <Carre
          val={morpion[0]}
          chooseCarre={() => {
            chooseCarre(0);
          }}
        />
        <Carre
          val={morpion[1]}
          chooseSquare={() => {
            chooseCarre(1);
          }}
        />
        <Carre
          val={morpion[2]}
          chooseCarre={() => {
            chooseCarre(2);
          }}
        />
      </div>
      <div className="ligne">
        <Carre
          val={morpion[3]}
          chooseCarre={() => {
            chooseCarre(3);
          }}
        />
        <Carre
          val={morpion[4]}
          chooseCarre={() => {
            chooseCarre(4);
          }}
        />
        <Carre
          val={morpion[5]}
          chooseCarre={() => {
            chooseCarre(5);
          }}
        />
      </div>
      <div className="ligne">
        <Carre
          val={morpion[6]}
          chooseCarre={() => {
            chooseCarre(6);
          }}
        />
        <Carre
          val={morpion[7]}
          chooseCarre={() => {
            chooseCarre(7);
          }}
        />
        <Carre
          val={morpion[8]}
          chooseCarre={() => {
            chooseCarre(8);
          }}
        />
      </div>
    </div>
  );
}

export default Morpion;
