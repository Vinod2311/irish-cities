import Mongoose from "mongoose";

const { Schema } = Mongoose;

const countySchema = new Schema({
  name: String,
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const County = Mongoose.model("County", countySchema);
