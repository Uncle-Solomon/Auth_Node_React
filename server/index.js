import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import model from "./models/user.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const user = await model.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok", something: user });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await model.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "Ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
