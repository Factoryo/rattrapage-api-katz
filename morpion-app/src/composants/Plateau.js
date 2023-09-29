import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Carre from "./Carre";
import { Patterns } from "../PatternsGagnants";

function Plateau({ resultat, setResultat }) {
  const [plateau, setPlateau] = useState(["", "", "", "", "", "", "", "", ""]);
  const [joueur, setJoueur] = useState("X");
  const [tour, setTour] = useState("X");

  const { canal } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    verifEgal();
    verifVictoire();
  }, [plateau]);

  const choisirCarre = async (carre) => {
    if (tour === joueur && plateau[carre] === "") {
      setTour(joueur === "X" ? "O" : "X");

      await canal.sendEvent({
        type: "mouv-jeu",
        data: { carre, joueur },
      });

      setPlateau(
        plateau.map((val, idx) => {
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
      const premierJoueur = plateau[patternActu[0]];
      if (premierJoueur === "") return;
      let patternGagnantTrouve = true;
      patternActu.forEach((idx) => {
        if (plateau[idx] !== premierJoueur) {
          patternGagnantTrouve = false;
        }
      });

      if (patternGagnantTrouve) {
        setResultat({ gagnant: plateau[patternActu[0]], etat: "gagne" });
      }
    });
  };

  const verifEgal = () => {
    let rempli = true;
    plateau.forEach((carre) => {
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
        plateau.map((val, idx) => {
          if (idx === event.data.carre && val === "") {
            return event.data.joueur;
          }
          return val;
        })
      );
    }
  });

  return (
    <div className="plateau">
      <div className="ligne">
        <Carre val={plateau[0]} choisirCarre={() => choisirCarre(0)} />
        <Carre val={plateau[1]} choisirCarre={() => choisirCarre(1)} />
        <Carre val={plateau[2]} choisirCarre={() => choisirCarre(2)} />
      </div>
      <div className="ligne">
        <Carre val={plateau[3]} choisirCarre={() => choisirCarre(3)} />
        <Carre val={plateau[4]} choisirCarre={() => choisirCarre(4)} />
        <Carre val={plateau[5]} choisirCarre={() => choisirCarre(5)} />
      </div>
      <div className="ligne">
        <Carre val={plateau[6]} choisirCarre={() => choisirCarre(6)} />
        <Carre val={plateau[7]} choisirCarre={() => choisirCarre(7)} />
        <Carre val={plateau[8]} choisirCarre={() => choisirCarre(8)} />
      </div>
    </div>
  );
}

export default Plateau;

/**Plateau du morpion */
