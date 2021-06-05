import React, { useEffect } from "react"
import { IContentSet } from "../interfaces"
// @ts-ignore
import styles from "../styles/contentsetsmodule.module"
import { Link, useHistory } from "react-router-dom"
import { categories } from "../modules/contentCategories"
import UserCard from "./UserCard"
import { convertDate } from "../helpers/convertDate"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { VscComment } from "react-icons/vsc"
import { BsPlus } from "react-icons/bs"
import { useLazyQuery, useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import { GET_CONTENTSET_DETAILED } from "../fetching/queries"
import { CONTENT_TOGGLE } from "../redux/toggle/toggleTypes"
import { SET_CONTENT_ACTIVE } from "../redux/contentActive/contentTypes"

interface IContentSetModuleProps {
  data?: IContentSet
  link?: string
  bgImage?: string
  popup?: boolean
}

const ContentSetModule: React.FC<IContentSetModuleProps> = ({
  data,
  link,
  bgImage,
  popup,
}) => {
  const histoty = useHistory()
  const dispatch = useDispatch()
  const [
    getContentSet,
    { data: contentSetData, loading, error },
  ] = useLazyQuery(GET_CONTENTSET_DETAILED)
  // const { data: wer, error: ert, loading: ewert } = useQuery(
  //   GET_CONTENTSET_DETAILED,
  //   {
  //     variables: { contentSetId: data && data.id },
  //   }
  // )

  // console.log({ contentSetData, loading, error })
  useEffect(() => {
    const contentData = contentSetData && contentSetData.getContentSet
    if (contentData) {
      dispatch({ type: SET_CONTENT_ACTIVE, payload: contentData })
    }
  }, [dispatch, contentSetData])

  const handlePopup = (id: string) => {
    getContentSet({ variables: { contentSetId: id } })
    // dispatch({ type: CONTENT_TOGGLE })
  }

  const handleLink = () => {
    const dataId = data && data.id
    histoty.push(`/details/${dataId}`)
  }

  const getData = (id: string) => {
    getContentSet({ variables: { contentSetId: id } })
  }

  if (!(data && data.image)) {
    return (
      <div className={styles.data_module}>
        <Link to={link || "/"} className={styles.data_module__link}>
          <img
            src={bgImage}
            className={styles.data_module__image}
            alt='imgPreview'
          />
          <div
            className={`${styles.data_module__link_overlay} ${styles.data_module__link_overlay_fixed}`}
          >
            <div className={styles.data_module__reference}>
              <span className={styles.data_module__reference_text}>MORE</span>
              <BsPlus className={styles.data_module__reference_icon} />
            </div>
          </div>
        </Link>
      </div>
    )
  }
  const progress = (data.dislikes * 100) / (data.likes + data.dislikes)
  // @ts-ignore
  const categoryLabel = categories[data.category].label
  return (
    <div className={styles.data_module}>
      <button
        onClick={popup ? () => handlePopup(data.id) : handleLink}
        className={styles.data_module__link}
      >
        <img
          src={data.image.location}
          className={styles.data_module__image}
          alt='imgPreview'
        />
        <div className={styles.data_module__link_overlay}>
          <div className={styles.data_module__rate}>
            <div className={styles.data_module__rate_icon}>
              <VscComment />
            </div>
            <span className={styles.data_module__rate_text}>
              {data.comments}
            </span>
          </div>
          <div className={styles.data_module__rates}>
            <div className={styles.data_module__rate_icons}>
              <div className={styles.data_module__rate}>
                <div className={styles.data_module__rate_icon}>
                  <AiOutlineLike />
                </div>
                <span className={styles.data_module__rate_text}>
                  {data.likes}
                </span>
              </div>

              <div className={styles.data_module__rate}>
                <div className={styles.data_module__rate_icon}>
                  <AiOutlineDislike />
                </div>
                <span className={styles.data_module__rate_text}>
                  {data.dislikes}
                </span>
              </div>
            </div>
            <div className={styles.data_module__progress}>
              <div
                className={styles.data_module__progress_bar}
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
          <span className={styles.data_module__date}>
            {convertDate(data.date)}
          </span>
        </div>
      </button>
      <UserCard isLink user={data.owner} lighter />
      <div>
        <span className={styles.data_module__category_title}>category:</span>
        <Link
          to={`/categories/${data.id}`}
          className={styles.data_module__category}
        >
          {categoryLabel}
        </Link>
      </div>
      {/* <button onClick={() => getData(data.id)}>длоілоівалоіва</button> */}
    </div>
  )
}

export default ContentSetModule
