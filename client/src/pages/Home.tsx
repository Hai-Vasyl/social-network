import React from "react"
import ContentSetsData from "../components/ContentSetsData"
import CategoryModule from "../components/CategoryModule"
// @ts-ignore
import styles from "../styles/page.module"

const Home = () => {
  return (
    <div>
      <div className='wrapper-extended'>
        <CategoryModule />
      </div>
      <div className='wrapper'>
        {/* <Title title='Create new media content' /> */}
        <div>Home page</div>

        <ContentSetsData />
      </div>
    </div>
  )
}

export default Home
