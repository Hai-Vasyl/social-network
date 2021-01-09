import { LikesRecord, User } from "../models"

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
}
