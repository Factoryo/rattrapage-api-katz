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
  const [estConnecte, definirEstCo] = useState(false);

  const deco = () => {
    cookies.remove("token");
    cookies.remove("idUser");
    cookies.remove("prenom");
    cookies.remove("nom");
    cookies.remove("motDePasseHash");
    cookies.remove("nomCanal");
    cookies.remove("pseudo");
    clientChat.disconnectUser();
    definirEstCo(false);
  };

  useEffect(() => {
    if (token) {
      clientChat
        .connecterUser(
          {
            id: cookies.get("idUser"),
            name: cookies.get("pseudo"),
            firstName: cookies.get("prenom"),
            lastName: cookies.get("nom"),
            motDePasseHash: cookies.get("motDePasseHash"),
          },
          token
        )
        .then(() => {
          definirEstCo(true);
        });
    }
  }, [token, clientChat, cookies]);

  return (
    <div className="App">
      {estConnecte ? (
        <Chat client={clientChat}>
          <RejoindreSalle />
          <button onClick={deco}> Se déconnecter</button>
        </Chat>
      ) : (
        <>
          <Inscription definirEstCo={definirEstCo} />
          <Connexion definirEstCo={definirEstCo} />
        </>
      )}
    </div>
  );
}

export default App;
