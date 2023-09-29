import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Inscription({ setEstAuthentifie }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const sInscrire = () => {
    Axios.post("http://localhost:3001/inscription", user).then((res) => {
      const { jeton, userId, prenom, nom, pseudo, motDePasseHash } =
        res.data;
      cookies.set("jeton", jeton);
      cookies.set("userId", userId);
      cookies.set("pseudo", pseudo);
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
          setUser({ ...user, prenom: event.target.value });
        }}
      />
      <input
        placeholder="Nom"
        onChange={(event) => {
          setUser({ ...user, nom: event.target.value });
        }}
      />
      <input
        placeholder="Nom d'utilisateur"
        onChange={(event) => {
          setUser({ ...user, nomUtilisateur: event.target.value });
        }}
      />
      <input
        placeholder="Mot de passe"
        type="password"
        onChange={(event) => {
          setUser({ ...user, motDePasse: event.target.value });
        }}
      />
      <button onClick={sInscrire}> S'inscrire</button>
    </div>
  );
}

export default Inscription;

/**Fonction d'inscription, problemes avec le frontend que je n'ai pas réussi a résoudre, en rapport avec des problemes de hook */
