import { config } from "dotenv"
import { v4 as uuidv4 } from "uuid"
import AWS from "aws-sdk"
config()
const { AWS_ID, AWS_SECRET, AWS_UPLOADS_BUCKET } = process.env

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
})

const getInitParams = (filename: string, createReadStream: any) => {
  return {
    ACL: "public-read",
    Bucket: AWS_UPLOADS_BUCKET,
    Key: `${uuidv4()}.${filename}`,
    Body: createReadStream(),
    Conditions: [{ acl: "public-read" }],
  }
}

const deleteFile = async (fileKey: string) => {
  if (fileKey) {
    // @ts-ignore
    await s3
      .deleteObject({
        Key: fileKey,
        Bucket: AWS_UPLOADS_BUCKET,
      })
      .promise()
  }
}

export const uploadUploadsBucket = async (file: any) => {
  try {
    const { createReadStream, filename } = await file
    const params: any = getInitParams(filename, createReadStream)

    const uploaded = await s3.upload(params).promise()
    return uploaded
  } catch (error) {
    throw new Error(`Uploading file to aws bucket error: ${error.message}`)
  }
}

// export const updateUploadsBucket = async (file: any, fileKey: string) => {
//   try {
//     const { createReadStream, filename } = await file

//     await deleteFile(fileKey)

//     const params: any = getInitParams(filename, createReadStream)

//     const uploaded = await s3.upload(params).promise()
//     return uploaded
//   } catch (error) {
//     throw new Error(`Updating file in aws bucket error: ${error.message}`)
//   }
// }

export const deleteUploadsBucket = async (fileKey: string) => {
  try {
    deleteFile(fileKey)
  } catch (error) {
    throw new Error(`Deleting file in aws bucket error: ${error.message}`)
  }
}
