import React, { useState } from "react";
import Plateau from "./Plateau";
import { Window, MessageList, MessageInput } from "stream-chat-react";

function Jeu({ canal, setCanal }) { 
  const [joueursRejoints, setJoueursRejoints] = useState(
    canal.state.watcher_count === 2
  );
  const [resultat, setResultat] = useState({ gagnant: "none", etat: "none" });

  canal.on("user.watching.start", (event) => {
    setJoueursRejoints(event.watcher_count === 2);
  });
  if (!joueursRejoints) {
    return <div> En attente de l'autre joueur...</div>;
  }
  return (
    <div className="conteneurJeu">
      <Plateau resultat={resultat} setResultat={setResultat} />
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          actionsMessage={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await canal.stopWatching();
          setCanal(null);
        }}
      >
        {" "}
        Quitter le Jeu
      </button>
      {resultat.etat === "won" && <div> {resultat.gagnant} a gagné</div>}
      {resultat.etat === "tie" && <div> Match nul</div>}
    </div>
  );
}

export default Jeu;
