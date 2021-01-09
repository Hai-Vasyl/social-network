import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  itemId: { type: Types.ObjectId, required: true },
  itemType: { type: String, enum: ["comment", "contentset"], required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  liked: { type: Boolean, required: true, default: true },
})

export default model("LikesRecord", schema)
