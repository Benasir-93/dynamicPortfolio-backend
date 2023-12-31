import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  portfolios: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  randomString: String,
  randomStringExpires: Date,
});

const User = mongoose.model("user", userSchema);

export { User };
