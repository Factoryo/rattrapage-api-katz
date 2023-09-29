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
    verifierEgalite();
    verifierVictoire();
  }, [plateau]);

  const choisirCarre = async (carre) => {
    if (tour === joueur && plateau[carre] === "") {
      setTour(joueur === "X" ? "O" : "X");

      await canal.sendEvent({
        type: "mouvement-jeu",
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

  const verifierVictoire = () => {
    Patterns.forEach((motifActuel) => {
      const premierJoueur = plateau[motifActuel[0]];
      if (premierJoueur === "") return;
      let motifGagnantTrouve = true;
      motifActuel.forEach((idx) => {
        if (plateau[idx] !== premierJoueur) {
          motifGagnantTrouve = false;
        }
      });

      if (motifGagnantTrouve) {
        setResultat({ gagnant: plateau[motifActuel[0]], etat: "gagne" });
      }
    });
  };

  const verifierEgalite = () => {
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
    if (event.type === "mouvement-jeu" && event.user.id !== client.userID) {
      const joueurActuel = event.data.joueur === "X" ? "O" : "X";
      setJoueur(joueurActuel);
      setTour(joueurActuel);
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
