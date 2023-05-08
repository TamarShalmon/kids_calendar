import mongoose from "mongoose"

const EventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String },
  image: { type: String },
  note: { type: String },
  pic: { type: String },
});

const WeatherSchema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String },
  style: { type: String },
});

const WeekSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  style: {},
  eventsList: [EventSchema],
  weatherDay: WeatherSchema,
});

const SmallUserSchema = new mongoose.Schema({
  userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  name: { type: String, required: true },
  week: [WeekSchema]
});



export const SmallUserModel = mongoose.model("smallUsers", SmallUserSchema);
