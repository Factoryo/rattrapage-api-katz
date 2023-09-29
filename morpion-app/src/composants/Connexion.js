import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Connexion({ setEstAuthentifie }) {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const cookies = new Cookies();
  const seConnecter = () => {
    Axios.post("http://localhost:3001/login", {
      nomUtilisateur,
      motDePasse,
    }).then((res) => {
      const { prenom, nom, nomUtilisateur, jeton, userId } = res.data;
      cookies.set("jeton", jeton);
      cookies.set("userId", userId);
      cookies.set("nomUtilisateur", nomUtilisateur);
      cookies.set("prenom", prenom);
      cookies.set("nom", nom);
      setEstAuthentifie(true);
    });
  };
  return (
    <div className="connexion">
      <label> Connexion</label>

      <input
        placeholder="Nom d'utilisateur"
        onChange={(event) => {
          setNomUtilisateur(event.target.value);
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
