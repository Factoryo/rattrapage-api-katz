import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Connexion({ setEstAuthentifie }) {
  const [pseudo, setPseudo] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const cookies = new Cookies();
  const seConnecter = () => {
    Axios.post("http://localhost:3001/login", {
      pseudo,
      motDePasse,
    }).then((res) => {
      const { prenom, nom, pseudo, jeton, userId } = res.data;
      cookies.set("jeton", jeton);
      cookies.set("userId", userId);
      cookies.set("pseudo", pseudo);
      cookies.set("prenom", prenom);
      cookies.set("nom", nom);
      setEstAuthentifie(true);
    });
  };
  return (
    <div className="connexion">
      <label> Connexion</label>

      <input
        placeholder="Pseudo"
        onChange={(event) => {
          setPseudo(event.target.value);
        }}
      />
      <input
        placeholder="Mot de passe"
        type="password"
        onChange={(event) => {
          setMotDePasse(event.target.value);
        }}
      />
      <button onClick={seConnecter}> Se connecter</button>
    </div>
  );
}

export default Connexion;

/**Connexion, problemes avec le frontend que je n'ai pas réussi a résoudre, en rapport avec des problemes de hook */
