import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Carre from "./Carre";
import { Patterns } from "../PatternsGagnants";
function Morpion({ resultat, setResultat }) {
  const [morpion, setPlateau] = useState(["", "", "", "", "", "", "", "", ""]);
  const [joueur, setJoueur] = useState("X");
  const [tour, setTour] = useState("X");

  const { canal } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    verifEgal();
    verifVictoire();
  }, [morpion]);

  const choixCarre = async (carre) => {
    if (tour === joueur && morpion[carre] === "") {
      setTour(joueur === "X" ? "O" : "X");

      await canal.sendEvent({
        type: "mouv-jeu",
        data: { carre, joueur },
      });

      setPlateau(
        morpion.map((val, idx) => {
          if (idx === carre && val === "") {
            return joueur;
          }
          return val;
        })
      );
    }
  };

  const verifVictoire = () => {
    Patterns.forEach((patternActu) => {
      const premierJoueur = morpion[patternActu[0]];
      if (premierJoueur === "") return;
      let patternGagnantTrouve = true;
      patternActu.forEach((idx) => {
        if (morpion[idx] !== premierJoueur) {
          patternGagnantTrouve = false;
        }
      });

      if (patternGagnantTrouve) {
        setResultat({ gagnant: morpion[patternActu[0]], etat: "gagne" });
      }
    });
  };

  const verifEgal = () => {
    let rempli = true;
    morpion.forEach((carre) => {
      if (carre === "") {
        rempli = false;
      }
    });

    if (rempli) {
      setResultat({ gagnant: "aucun", etat: "egalite" });
    }
  };

  canal.on((event) => {
    if (event.type === "mouv-jeu" && event.user.id !== client.userID) {
      const joueurActu = event.data.joueur === "X" ? "O" : "X";
      setJoueur(joueurActu);
      setTour(joueurActu);
      setPlateau(
        morpion.map((val, idx) => {
          if (idx === event.data.carre && val === "") {
            return event.data.joueur;
          }
          return val;
        })
      );
    }
  });

  return (
    <div className="morpion">
      <div className="ligne">
        <Carre val={morpion[0]} choisirCarre={() => choixCarre(0)} />
        <Carre val={morpion[1]} choisirCarre={() => choixCarre(1)} />
        <Carre val={morpion[2]} choisirCarre={() => choixCarre(2)} />
      </div>
      <div className="ligne">
        <Carre val={morpion[3]} choisirCarre={() => choixCarre(3)} />
        <Carre val={morpion[4]} choisirCarre={() => choixCarre(4)} />
        <Carre val={morpion[5]} choisirCarre={() => choixCarre(5)} />
      </div>
      <div className="ligne">
        <Carre val={morpion[6]} choisirCarre={() => choixCarre(6)} />
        <Carre val={morpion[7]} choisirCarre={() => choixCarre(7)} />
        <Carre val={morpion[8]} choisirCarre={() => choixCarre(8)} />
      </div>
    </div>
  );
}

export default Morpion;

/**Plateau du morpion */
