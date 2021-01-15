import React, { useEffect } from "react"
import { GET_CONTENTSETS } from "../fetching/queries"
import { useLazyQuery, useQuery } from "@apollo/client"
import ContentSetsModule from "./ContentSetsModule"
import { categories } from "../modules/contentCategories"
import { sortKeys } from "../modules/sort"

const ContentSetsData: React.FC = () => {
  const [getContentSets, { data: contentSetsData, error }] = useLazyQuery(
    GET_CONTENTSETS
  )

  useEffect(() => {
    getContentSets({
      variables: {
        category: categories.art.keyWord,
        from: 0,
        to: 20,
        sortKey: sortKeys.date.keyWord,
        sortOrder: -1,
      },
    })
  }, [])

  console.log("DATA SET:", contentSetsData, error)
  return (
    <div>
      <ContentSetsModule
        contentSets={contentSetsData && contentSetsData.getContentSets}
      />
    </div>
  )
}

export default ContentSetsData
