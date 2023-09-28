import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { StreamChat } from "stream-chat";

const app = express();

app.use(cors());
app.use(express.json());
const api_key = "bkhgt5xrfare";
const api_secret = "4fdh69h5py6urjhutm6ruyuq3mxp3cs8bkkhjvnntq3rfa9wnch22vmme5fqe24v";
const serveurClient = StreamChat.getInstance(api_key, api_secret);

app.post("/inscription", async (req, res) => {
    try {
      const { prenom, nom, pseudo, motdepasse } = req.body;
      const userId = uuidv4();
      const MotdePassecoupe = await bcrypt.hash(motdepasse, 10);
      const token = serveurClient.createToken(userId);
      res.json({ token, userId, prenom, nom, pseudo, MotdePassecoupe });
    } catch (error) {
      res.json(error);
    }
  });

  app.post("/connexion", async (req, res) => {
    try {
      const { pseudo, motdepasse } = req.body;
      const { users } = await serveurClient.queryUsers({ nom: pseudo });
      if (users.length === 0) return res.json({ message: "Utilisateur introuvable" });
  
      const token = serveurClient.createToken(users[0].id);
      const motdepasseMatch = await bcrypt.compare(
        motdepasse,
        users[0].MotdePassecoupe
      );
  
      if (motdepasseMatch) {
        res.json({
          token,
          prenom: users[0].prenom,
          nom: users[0].nom,
          pseudo,
          userId: users[0].id,
        });
      }
    } catch (error) {
      res.json(error);
    }
  });

app.listen(3001, () => {
    console.log("Serveur est sur le port 3001");
  });