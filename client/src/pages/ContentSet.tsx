import React from "react"
import { useParams } from "react-router-dom"
import { GET_CONTENTSET_DETAILED, TEST } from "../fetching/queries"
import { useQuery } from "@apollo/client"

const ContentSet = () => {
  const { contentId }: any = useParams()
  const { data, loading, error } = useQuery(GET_CONTENTSET_DETAILED, {
    variables: { contentSetId: contentId },
  })

  console.log({ data, loading, error })
  return (
    <div>
      <div>ContentSet Page: {contentId}</div>
    </div>
  )
}

export default ContentSet
