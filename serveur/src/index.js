import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./modeles/user.js";
import GameSession from "./modeles/gameSession.js";
import dotenv from 'dotenv';

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
    return res.status(401).json({ message: "User not found" });
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
    res.status(401).json({ message: "Invalid password" });
  }
});

app.post("/createGameSession", async (req, res) => {
  const newSession = new GameSession();
  await newSession.save();
  res.json(newSession);
});

app.post("/joinGameSession", async (req, res) => {
  const { sessionId, userId } = req.body;
  const session = await GameSession.findById(sessionId);
  if (session.players.length < 2 && !session.players.includes(userId)) {
    session.players.push(userId);
    await session.save();
  }
  res.json(session);
});

app.get("/getAvailableGameSession", async (req, res) => {
  const availableSession = await GameSession.findOne({
    players: { $size: 1 }
  });
  if (availableSession) {
    res.json(availableSession);
  } else {
    res.status(404).json({ message: "No available game session found" });
  }
});

app.get("/gameSessionStatus/:sessionId", async (req, res) => {
  const session = await GameSession.findById(req.params.sessionId).populate('players');
  if (!session) {
    return res.status(404).json({ error: "Game session not found" });
  }
  res.json(session);
});

mongoose.connect('mongodb://localhost:27017/morpion-app', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
