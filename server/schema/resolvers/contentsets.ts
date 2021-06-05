import { ContentSet, Upload } from "../models"
import {
  uploadUploadsBucket,
  deleteUploadsBucket,
} from "../helpers/crudUploadsBucket"
import { IField, IIsAuth } from "../interfaces"
import { sortKeys } from "../modules/sort"

export const Query = {
  async getContentSet(_: any, { contentSetId }: IField) {
    try {
      //TODO: add validation and check in models

      const contentSet = await ContentSet.findById(contentSetId)
      return contentSet
    } catch (error) {
      throw new Error(`Getting ContentSet error: ${error.message}`)
    }
  },
  async TestQuery(_: any, __: any, { isAuth }: { isAuth: IIsAuth }) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      console.log("sdfsdf")
      // console.log("hskjdfhjksdfnhjksf")
      // const contentSet = await ContentSet.findById(contentSetId)
      return "contentSet"
    } catch (error) {
      throw new Error(`Getting ContentSet error: ${error.message}`)
    }
  },
  async getContentSets(
    _: any,
    {
      category,
      userId,
      from,
      to,
      sortKey = sortKeys.date,
      sortOrder = -1,
    }: IField
  ) {
    try {
      //TODO: add validation and check in models

      const getSortColection = async (sortObj: { [key: string]: any }) => {
        const categoryQuery = category ? category : { $exists: true }
        const ownerQuery = userId ? userId : { $exists: true }
        const collection = await ContentSet.find({
          category: categoryQuery,
          owner: ownerQuery,
        })
          .sort(sortObj)
          .skip(from)
          .limit(to)
        return collection
      }

      const collection = await getSortColection({ [sortKey]: sortOrder })
      return collection
    } catch (error) {
      throw new Error(`Getting ContentSets error: ${error.message}`)
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
