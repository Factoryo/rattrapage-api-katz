import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Inscription({ setEstAuthentifie }) {
  const cookies = new Cookies();
  const [utilisateur, setUtilisateur] = useState(null);

  const sInscrire = () => {
    Axios.post("http://localhost:3001/inscription", utilisateur).then((res) => {
      const { jeton, userId, prenom, nom, nomUtilisateur, motDePasseHash } =
        res.data;
      cookies.set("jeton", jeton);
      cookies.set("userId", userId);
      cookies.set("nomUtilisateur", nomUtilisateur);
      cookies.set("prenom", prenom);
      cookies.set("nom", nom);
      cookies.set("motDePasseHash", motDePasseHash);
      setEstAuthentifie(true);
    });
  };
  return (
    <div className="inscription">
      <label> Inscription</label>
      <input
        placeholder="Prénom"
        onChange={(event) => {
          setUtilisateur({ ...utilisateur, prenom: event.target.value });
        }}
      />
      <input
        placeholder="Nom"
        onChange={(event) => {
          setUtilisateur({ ...utilisateur, nom: event.target.value });
        }}
      />
      <input
        placeholder="Nom d'utilisateur"
        onChange={(event) => {
          setUtilisateur({ ...utilisateur, nomUtilisateur: event.target.value });
        }}
      />
      <input
        placeholder="Mot de passe"
        type="password"
        onChange={(event) => {
          setUtilisateur({ ...utilisateur, motDePasse: event.target.value });
        }}
      />
      <button onClick={sInscrire}> S'inscrire</button>
    </div>
  );
}

export default Inscription;
