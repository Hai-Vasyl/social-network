import { ContentSet, Upload } from "../models"
import {
  uploadUploadsBucket,
  deleteUploadsBucket,
} from "../helpers/crudUploadsBucket"
import { IField, IIsAuth } from "../interfaces"

export const Query = {
  async getContentSet(
    _: any,
    { contentSetId }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      const contentSet = await ContentSet.findById(contentSetId)
      return contentSet
    } catch (error) {
      throw new Error(`Getting ContentSet error: ${error.message}`)
    }
  },
}

export const Mutation = {
  async createContentSet(
    _: any,
    { uploads, content, category }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      if (uploads.length) {
        if (uploads.length > 10) {
          throw new Error(
            JSON.stringify({
              uploads: {
                value: "",
                msg: ["You cannot select more than 10 files!"],
              },
            })
          )
        }
        const contentSet = new ContentSet({
          owner: isAuth.userId,
          date: new Date(),
          content,
          category,
        })
        const contentSetNew = await contentSet.save()

        for (let i = 0; i < uploads.length; i++) {
          const bucketUpload = await uploadUploadsBucket(uploads[i])

          const newUpload = new Upload({
            owner: isAuth.userId,
            date: new Date(),
            location: bucketUpload.Location,
            contentSet: contentSetNew.id,
            key: bucketUpload.Key,
          })
          await newUpload.save()
        }

        return contentSetNew.id
      } else {
        throw new Error(
          JSON.stringify({
            uploads: {
              value: "",
              msg: ["You must select at least one media file!"],
            },
          })
        )
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async editContentSet(
    _: any,
    { contentSetId, uploads, content, category }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      if (uploads.length) {
        if (uploads.length > 10) {
          throw new Error(
            JSON.stringify({
              uploads: {
                value: "",
                msg: ["You cannot select more than 10 files!"],
              },
            })
          )
        }
        const prevUploads: any = await Upload.find({ contentSet: contentSetId })
        for (let i = 0; i < prevUploads.length; i++) {
          await deleteUploadsBucket(prevUploads[i].key)
        }
        await Upload.deleteMany({ contentSet: contentSetId })
        for (let i = 0; i < uploads.length; i++) {
          const bucketUpload = await uploadUploadsBucket(uploads[i])

          const newUpload = new Upload({
            owner: isAuth.userId,
            date: new Date(),
            location: bucketUpload.Location,
            contentSet: contentSetId,
            key: bucketUpload.Key,
          })
          await newUpload.save()
        }
      }

      await ContentSet.updateOne(
        { _id: contentSetId },
        { content, category, date: new Date() }
      )
      return contentSetId
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
