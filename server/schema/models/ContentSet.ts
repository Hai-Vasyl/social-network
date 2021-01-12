import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  content: { type: String },
  sticky: { type: Boolean, default: false, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "nature",
      "art",
      "politics",
      "sport",
      "technologies",
      "fantasy",
      "music",
      "cars",
      "motorcycles",
      "macro",
      "animals",
      "food",
      "space",
      "vector",
      "abstraction",
    ],
  },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  comments: { type: Number, required: true, default: 0 },
})

export default model("ContentSet", schema)
