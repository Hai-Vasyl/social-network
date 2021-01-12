import React from "react"
import { useParams } from "react-router-dom"

const ContentSet = () => {
  const { contentId }: any = useParams()
  return (
    <div>
      <div>ContentSet Page: {contentId}</div>
    </div>
  )
}

export default ContentSet
