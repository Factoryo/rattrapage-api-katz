import React, { useState, useEffect } from "react";
import "./App.css";
import Connexion from "./composants/Connexion";
import Inscription from "./composants/Inscription";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import RejoindreSalle from "./composants/RejoindreSalle";

function App() {
  const cleApi = "mrp9h9wk79gy";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const clientChat = StreamChat.getInstance(cleApi);
  const [estConnecte, definirEstConnecte] = useState(false);

  const deconnecter = () => {
    cookies.remove("token");
    cookies.remove("idUtilisateur");
    cookies.remove("prenom");
    cookies.remove("nom");
    cookies.remove("motDePasseHash");
    cookies.remove("nomCanal");
    cookies.remove("nomUtilisateur");
    clientChat.disconnectUser();
    definirEstConnecte(false);
  };

  useEffect(() => {
    if (token) {
      clientChat
        .connecterUtilisateur(
          {
            id: cookies.get("idUtilisateur"),
            name: cookies.get("nomUtilisateur"),
            firstName: cookies.get("prenom"),
            lastName: cookies.get("nom"),
            motDePasseHash: cookies.get("motDePasseHash"),
          },
          token
        )
        .then(() => {
          definirEstConnecte(true);
        });
    }
  }, [token, clientChat, cookies]);

  return (
    <div className="App">
      {estConnecte ? (
        <Chat client={clientChat}>
          <RejoindreSalle />
          <button onClick={deconnecter}> Se déconnecter</button>
        </Chat>
      ) : (
        <>
          <Inscription definirEstConnecte={definirEstConnecte} />
          <Connexion definirEstConnecte={definirEstConnecte} />
        </>
      )}
    </div>
  );
}

export default App;
