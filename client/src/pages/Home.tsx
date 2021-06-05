import React from "react"
import ContentSetsModule from "../components/ContentSetsModule"
import CategoryModule from "../components/CategoryModule"
// @ts-ignore
import styles from "../styles/page.module"
import { sortKeys } from "../modules/sort"

const Home = () => {
  return (
    <div>
      <div className='wrapper-extended'>
        <CategoryModule />
      </div>
      <div className='wrapper'>
        <ContentSetsModule
          title='New & hot'
          extended
          link={`/content-sets?sort=${sortKeys.date.keyWord}`}
          from={0}
          to={7}
          sortKey={sortKeys.date.keyWord}
          sortOrder={-1}
        />
        <ContentSetsModule
          title='Popular'
          extended
          link={`/content-sets?sort=${sortKeys.likes.keyWord}`}
          from={0}
          to={7}
          sortKey={sortKeys.likes.keyWord}
          sortOrder={-1}
        />
        <ContentSetsModule
          title='Black list'
          extended
          link={`/content-sets?sort=${sortKeys.dislikes.keyWord}`}
          from={0}
          to={7}
          sortKey={sortKeys.dislikes.keyWord}
          sortOrder={-1}
        />
        <ContentSetsModule
          title='Most commented'
          extended
          link={`/content-sets?sort=${sortKeys.comments.keyWord}`}
          from={0}
          to={7}
          sortKey={sortKeys.comments.keyWord}
          sortOrder={-1}
        />
      </div>
    </div>
  )
}

export default Home
