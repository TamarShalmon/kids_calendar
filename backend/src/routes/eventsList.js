import express from "express";
import mongoose from "mongoose";
import { EventsListModel } from "../models/EventsList.js";
import { UserModel } from "../models/Users.js";
// import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await EventsListModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});


export { router as eventsListRouter };
