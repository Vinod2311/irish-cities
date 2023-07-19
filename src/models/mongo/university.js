import Mongoose from "mongoose";

const { Schema } = Mongoose;

const universitySchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  description: String,
  countyId: {
    type: Schema.Types.ObjectId,
    ref: "county",
  },
});

export const University = Mongoose.model("University", universitySchema);
