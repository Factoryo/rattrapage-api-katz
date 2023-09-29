import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Jeu from "./Jeu";
import InputPerso from "./InputPerso";

function RejoindreJeu() {
  const [pseudoConcu, setPseudoConcu] = useState("");
  const { client } = useChatContext();
  const [canal, setCanal] = useState(null);
  const creerCanal = async () => {
    const reponse = await client.queryUsers({ name: { $eq: pseudoConcu } });

    if (reponse.users.length === 0) {
      alert("Utilisateur introuvable");
      return;
    }

    const nouveauCanal = await client.channel("messaging", {
      members: [client.userID, reponse.users[0].id],
    });

    await nouveauCanal.watch();
    setCanal(nouveauCanal);
  };

  return (
    <>
      {canal ? (
        <Channel channel={canal} Input={InputPerso}>
          <Jeu canal={canal} setCanal={setCanal} />
        </Channel>
      ) : (
        <div className="rejoindreJeu">
          <h4>Créer Jeu</h4>
          <input
            placeholder="Pseudo de l'adversaire..."
            onChange={(event) => {
              setPseudoConcu(event.target.value);
            }}
          />
          <button onClick={creerCanal}> Rejoindre/Démarrer Jeu</button>
        </div>
      )}
    </>
  );
}

export default RejoindreJeu;

/**Rejoindre la partie en cours */
