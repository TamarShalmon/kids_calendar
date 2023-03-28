import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user.js";
import { eventsListRouter } from "./routes/eventsList.js";

const app = express();

app.use(json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/eventsList", eventsListRouter);

mongoose.connect(
  "mongodb+srv://tamar-shalmon1:tamarshalmon@kids-calander.wqj46p6.mongodb.net/kids-calander?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => console.log("Server started"));