import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Connexion({ setIsAuth }) {
  const [pseudo, setPseudo] = useState("");
  const [motdepasse, setMotdePasse] = useState("");

  const cookies = new Cookies();
  const connexion = () => {
    Axios.post("http://localhost:3001/login", {
      pseudo,
      motdepasse,
    }).then((res) => {
      const { prenom, nom, pseudo, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("pseudo", pseudo);
      cookies.set("prenom", prenom);
      cookies.set("nom", nom);
      setIsAuth(true);
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
        placeholder="Mot de Passe"
        type="motdepasse"
        onChange={(event) => {
          setMotdePasse(event.target.value);
        }}
      />
      <button onClick={connexion}> Connexion</button>
    </div>
  );
}

export default Connexion;
