import React from "react"
import { IContentSet } from "../interfaces"
// @ts-ignore
import styles from "../styles/contentsetsmodule.module"
import ContentSetModule from "./ContentSetModule"
import Title from "./Title"
import { GET_CONTENTSETS } from "../fetching/queries"
import { useQuery } from "@apollo/client"
import Loader from "./Loader"

interface ContentSetsModuleProps {
  extended?: boolean
  link?: string
  popup?: boolean
  title: string
  category?: string
  userId?: string
  from: number
  to: number
  sortKey?: string
  sortOrder?: number
}
const ContentSetsModule: React.FC<ContentSetsModuleProps> = ({
  extended,
  link = "/",
  popup,
  title,
  category,
  userId,
  from,
  to,
  sortKey,
  sortOrder,
}) => {
  const { data: contentSetsData, loading: loadContentSet, error } = useQuery(
    GET_CONTENTSETS,
    {
      variables: {
        category,
        userId,
        from,
        to,
        sortKey,
        sortOrder,
      },
    }
  )

  const contentSets = contentSetsData ? contentSetsData.getContentSets : []
  return (
    <>
      <Title title={title} />
      <div
        className={`${styles.container} ${
          extended && styles.container__extend
        }`}
      >
        {loadContentSet ? (
          <Loader />
        ) : (
          contentSets.map((item: IContentSet) => {
            return <ContentSetModule data={item} key={item.id} popup={popup} />
          })
        )}
        {extended && (
          <ContentSetModule
            link={link}
            bgImage={contentSets[0] && contentSets[0].image.location}
          />
        )}
      </div>
    </>
  )
}

export default ContentSetsModule
