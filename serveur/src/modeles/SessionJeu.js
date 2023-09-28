import mongoose from "mongoose";

const SchemaSessionJeu = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  gameStarted: { type: Boolean, default: false }
});

export default mongoose.model("SessionJeu", SchemaSessionJeu);
