import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";

import { userRouter } from "./routes/user.js";
import { eventsListRouter } from "./routes/eventsList.js";
import { SmallUserRouter } from "./routes/smallUser.js";
config();

const app = express();

app.use(json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/small-user", SmallUserRouter);
// app.use("/eventsList", eventsListRouter);

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.CONECTION_STRING)
    console.log("mongo connect");
  } catch (error) {
    console.log("mongo not connect");
  }
};

connectToDataBase()

app.listen(3001, () => console.log("Server started"));