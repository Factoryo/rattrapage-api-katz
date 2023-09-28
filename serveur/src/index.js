import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./modeles/user.js";
import SessionJeu from "./modeles/SessionJeu.js";
import dotenv from 'dotenv';

/*dotenv bcrypt et cors m'aident pour l'authentification*/
/*mongoose est installé car j'utilise mongodb*/

dotenv.config({ path: '../db.env' });

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/morpion-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    username,
    hashedPassword
  });
  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token, userId: user._id, firstName, lastName, username });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Utilisateur introuvable" });
  }
  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
  if (passwordMatch) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      username,
      userId: user._id,
    });
  } else {
    res.status(401).json({ message: "Mot de passe non valide" });
  }
});

app.post("/CreaSessionJeu", async (req, res) => {
  const nvSession = new SessionJeu();
  await nvSession.save();
  res.json(nvSession);
});

app.post("/joinSessionJeu", async (req, res) => {
  const { sessionId, userId } = req.body;
  const session = await GameSession.findById(sessionId);
  if (session.players.length < 2 && !session.players.includes(userId)) {
    session.players.push(userId);
    await session.save();
  }
  res.json(session);
});

app.get("/getSessionJeuDispo", async (req, res) => {
  const availableSession = await SessionJeu.findOne({
    players: { $size: 1 }
  });
  if (SessionDispo) {
    res.json(SessionDispo);
  } else {
    res.status(404).json({ message: "Pas de session disponible trouvée" });
  }
});

app.get("/StatutSessionJeu/:sessionId", async (req, res) => {
  const session = await Sessionjeu.findById(req.params.sessionId).populate('players');
  if (!session) {
    return res.status(404).json({ error: "Pas de session trouvée" });
  }
  res.json(session);
});

mongoose.connect('mongodb://localhost:27017/morpion-app', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connnecté a MongoDB');
  })
  .catch((error) => {
    console.error('N arrive pas a se connecter a mongodb', error);
});


app.listen(3001, () => {
  console.log("Serveur sur port 3001");
});
