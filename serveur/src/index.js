import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./modeles/user.js";import dotenv from 'dotenv';

dotenv.config({ path: '../db.env' });

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/morpion-app', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

app.post("/signup", async (req, res) => {
  try {
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
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  console.log("Received login request:", req.body);

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found for:", username);
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      console.log("Sending response:", token, user.firstName, user.lastName, username, user._id); // Log pour le débogage
      res.json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        username,
        userId: user._id,
      });
    } else {
      console.log("Invalid password for:", username);
      res.status(401).json({ message: "Invalid password" });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
