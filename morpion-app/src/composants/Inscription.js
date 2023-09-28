import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Inscription({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const inscription = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, prenom, nom, pseudo, MotdePassecoupe } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("pseudo", pseudo);
      cookies.set("prenom", prenom);
      cookies.set("nom", nom);
      cookies.set("MotdePassecoupe", MotdePassecoupe);
      setIsAuth(true);
    });
  };
  return (
    <div className="inscription">
      <label> Inscription</label>
      <input
        placeholder="Prenom"
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
        placeholder="Pseudo"
        onChange={(event) => {
          setUser({ ...user, pseudo: event.target.value });
        }}
      />
      <input
        placeholder="Mot de Passe"
        type="motdepasse"
        onChange={(event) => {
          setUser({ ...user, motdepasse: event.target.value });
        }}
      />
      <button onClick={inscription}> Inscription</button>
    </div>
  );
}

export default Inscription;
