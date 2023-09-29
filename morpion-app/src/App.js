import "./App.css";
import Connexion from "./composants/Connexion";
import Inscription from "./composants/Inscription";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import RejoindrePartie from "./components/RejoindrePartie";

function App() {
  const cle_api = "mrp9h9wk79gy";
  const cookies = new Cookies();
  const jeton = cookies.get("jeton");
  const client = StreamChat.getInstance(cle_api);
  const [estAuthentifie, setEstAuthentifie] = useState(false);

  const seDeconnecter = () => {
    cookies.remove("jeton");
    cookies.remove("userId");
    cookies.remove("prenom");
    cookies.remove("nom");
    cookies.remove("motDePasseHash");
    cookies.remove("nomCanal");
    cookies.remove("nomUtilisateur");
    client.disconnectUser();
    setEstAuthentifie(false);
  };

  if (jeton) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("nomUtilisateur"),
          firstName: cookies.get("prenom"),
          lastName: cookies.get("nom"),
          hashedPassword: cookies.get("motDePasseHash"),
        },
        jeton
      )
      .then((utilisateur) => {
        setEstAuthentifie(true);
      });
  }

  return (
    <div className="App">
      {estAuthentifie ? (
        <Chat client={client}>
          <RejoindrePartie />
          <button onClick={seDeconnecter}> Se déconnecter</button>
        </Chat>
      ) : (
        <>
          <Inscription setEstAuthentifie={setEstAuthentifie} />
          <Connexion setEstAuthentifie={setEstAuthentifie} />
        </>
      )}
    </div>
  );
}

export default App;
