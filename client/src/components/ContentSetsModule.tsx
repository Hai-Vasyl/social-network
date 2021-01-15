import React from "react"
import { IContentSet } from "../interfaces"
// @ts-ignore
import styles from "../styles/contentsetsmodule.module"
import ContentSetModule from "./ContentSetModule"

interface ContentSetsModuleProps {
  contentSets?: IContentSet[]
}
const ContentSetsModule: React.FC<ContentSetsModuleProps> = ({
  contentSets,
}) => {
  console.log("DATA CONTENTSETS:", contentSets)

  return (
    <div className={styles.container}>
      {contentSets &&
        contentSets.map((item) => {
          return <ContentSetModule data={item} />
        })}
    </div>
  )
}

export default ContentSetsModule
