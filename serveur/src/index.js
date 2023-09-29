import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const app = express();

app.use(cors());
app.use(express.json());
const cle_api = "mrp9h9wk79gy";
const secret_api =
  "nyefy4p8dzjpem43drjwxepr57ws3duysb7p5wybh5z63nk427bgb9t9zrfd7g26";
const clientServeur = StreamChat.getInstance(cle_api, secret_api);

app.post("/inscription", async (req, res) => {
  try {
    const { prenom, nom, pseudo, motDePasse } = req.body;
    const userId = uuidv4();
    const motDePasseHash = await bcrypt.hash(motDePasse, 10);
    const jeton = clientServeur.createToken(userId);
    res.json({ jeton, userId, prenom, nom, pseudo, motDePasseHash });
  } catch (erreur) {
    res.json(erreur);
  }
});

app.post("/connexion", async (req, res) => {
  try {
    const { pseudo, motDePasse } = req.body;
    const { users } = await clientServeur.queryUsers({ name: pseudo });
    if (users.length === 0) return res.json({ message: "Utilisateur introuvable" });

    const jeton = clientServeur.createToken(users[0].id);
    const correspoMotDePasse = await bcrypt.compare(
      motDePasse,
      utilisateurs[0].motDePasseHash
    );

    if (correspoMotDePasse) {
      res.json({
        jeton,
        prenom: users[0].prenom,
        nom: users[0].nom,
        pseudo,
        userId: users[0].id,
      });
    }
  } catch (erreur) {
    res.json(erreur);
  }
});

app.listen(3001, () => {
  console.log("Le serveur est en marche sur le port 3001");
});

/**Partie backend */