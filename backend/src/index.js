import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";

import { userRouter } from "./routes/user.js";
import { SmallUserRouter } from "./routes/smallUser.js";
config();

const app = express();

app.use(json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/small-user", SmallUserRouter);


const connectToDataBase = async () => {
  try {
    console.log("going to mongo connect");
    await mongoose.connect(process.env.CONECTION_STRING)
    console.log("mongo connect");
  } catch (error) {
    console.log(error);
    console.log("mongo not connect");
  }
};

connectToDataBase()

app.listen(process.env.PORT || 3001, () => console.log("Server started"));