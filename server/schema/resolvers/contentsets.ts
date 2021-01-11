import { ContentSet, Upload } from "../models"
import { uploadUploadsBucket } from "../helpers/crudUploadsBucket"
import { IField, IIsAuth } from "../interfaces"

// export const Query = {

// }

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

      console.log({ uploads })
      let uploaded = []
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
        for (let i = 0; i < uploads.length; i++) {
          const bucketUpload = await uploadUploadsBucket(uploads[i])
          uploaded.push(bucketUpload)
        }
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

      const contentSet = new ContentSet({
        owner: isAuth.userId,
        date: new Date(),
        content,
        category,
      })
      const contentSetNew = await contentSet.save()

      console.log({ uploaded })
      let uploadsNew = []
      for (let i = 0; i < uploaded.length; i++) {
        const newUpload = new Upload({
          owner: isAuth.userId,
          date: new Date(),
          location: uploaded[i].Location,
          contentSet: contentSetNew.id,
          key: uploaded[i].Key,
        })
        const uploadSaved = await newUpload.save()
        uploadsNew.push(uploadSaved)
      }

      return contentSetNew.id
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
