import React, { useEffect, useState } from "react"
// import { GET_CONTENTSET } from "../fetching/queries"
import { useQuery } from "@apollo/client"
// @ts-ignore
import styles from "../styles/contentsetsmodule.module"
import { IContentSet } from "../interfaces"
import { CONTENT_TOGGLE } from "../redux/toggle/toggleTypes"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../redux/store"
// import {SET_CONTENT_ACTIVE} from "../redux/contentActive/contentTypes"

interface IPopupContentSet {}

const PopupContentSet: React.FC<IPopupContentSet> = () => {
  const {
    toggle: { content: toggleContent },
    content: { contentActive },
  } = useSelector((state: RootStore) => state)

  console.log({ contentActive })
  return (
    <>
      <div
        className={`${styles.content_popup} ${
          toggleContent && styles.content_popup__active
        }`}
      >
        <div>Popup</div>
      </div>
    </>
  )
}

export default PopupContentSet
