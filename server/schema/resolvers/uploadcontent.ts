import { ContentSet } from "../models"

export const UploadContent = {
  async contentSet({ contentSet }: { contentSet: string }) {
    try {
      const content = await ContentSet.findOne({ _id: contentSet })
      return content
    } catch (error) {
      throw new Error(
        `Getting ContentSet to media upload error: ${error.message}`
      )
    }
  },
}
