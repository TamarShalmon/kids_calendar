import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
// import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(json());
app.use(cors());

app.use("/auth", userRouter);
// app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://tamar-shalmon1:tamarshalmon@kids-calander.wqj46p6.mongodb.net/kids-calander?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
);

app.listen(3001, () => console.log("Server started"));