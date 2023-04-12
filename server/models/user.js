import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: { type: String, requied: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { collection: "user-data" }
);

const model = mongoose.model("User", User);

export default model;
