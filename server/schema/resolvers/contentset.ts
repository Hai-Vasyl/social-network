import { LikesRecord, User, Upload, Comment } from "../models"
import { types } from "../modules/commentTypes"

export const ContentSet = {
  async likeRecord({ id }: { id: string }) {
    try {
      const likeRecord = await LikesRecord.findOne({ itemId: id })
      return likeRecord
    } catch (error) {
      throw new Error(`Getting ContentSet likeRecord error: ${error.message}`)
    }
  },
  async owner({ owner }: { owner: string }) {
    try {
      const user = await User.findOne({ _id: owner })
      return user
    } catch (error) {
      throw new Error(`Getting ContentSet owner error: ${error.message}`)
    }
  },
  async image({ id }: { id: string }) {
    try {
      const upload = await Upload.findOne({ contentSet: id })
      return upload
    } catch (error) {
      throw new Error(
        `Getting ContentSet preview upload error: ${error.message}`
      )
    }
  },
  async uploads({ id }: { id: string }) {
    try {
      const uploads = await Upload.find({ contentSet: id })
      return uploads
    } catch (error) {
      throw new Error(`Getting ContentSet uploads error: ${error.message}`)
    }
  },
  // async commentsData({ id }: { id: string }) {
  //   try {
  //     const comments = await Comment.find({
  //       contentSet: id,
  //       type: types.comment.keyWord,
  //     })
  //     return comments
  //   } catch (error) {
  //     throw new Error(`Getting ContentSet comments error: ${error.message}`)
  //   }
  // },
}
