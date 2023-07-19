import Mongoose from "mongoose";

const { Schema } = Mongoose;

const countySchema = new Schema({
  name: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const County = Mongoose.model("County", countySchema);
