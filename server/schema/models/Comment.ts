import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, required: true },
  type: {
    type: String,
    required: true,
    enum: ["comment", "reply"],
    default: "comment",
  },
  comment: { type: Types.ObjectId, ref: "Comment" },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  contentSet: { type: Types.ObjectId, ref: "ContentSet", required: true },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  replies: { type: Number, default: 0 },
})

export default model("Comment", schema)
