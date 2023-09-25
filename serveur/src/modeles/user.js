import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  hashedPassword: String
});

const User = mongoose.model('User', userSchema);

export default User;
