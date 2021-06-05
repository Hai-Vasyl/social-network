import React from "react"
import ContentSetsModule from "../components/ContentSetsModule"
import { useLocation } from "react-router-dom"
import PopupContentSet from "../components/PopupContentSet"

const ContentSets: React.FC = () => {
  const location = useLocation().search
  const params = new URLSearchParams(location)
  const sort = params.get("sort")
  const category = params.get("category")

  return (
    <div className='wrapper'>
      <PopupContentSet />
      <ContentSetsModule
        category={category || ""}
        title='Sort & filter content'
        popup={true}
        from={0}
        to={25}
        sortKey={sort || undefined}
        sortOrder={-1}
      />
    </div>
  )
}

export default ContentSets
