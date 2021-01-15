import React from "react"
import { IContentSet } from "../interfaces"
// @ts-ignore
import styles from "../styles/contentsetsmodule.module"
import { Link } from "react-router-dom"
import { categories } from "../modules/contentCategories"
import UserCard from "./UserCard"
import { convertDate } from "../helpers/convertDate"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { VscComment } from "react-icons/vsc"

interface IContentSetModuleProps {
  data: IContentSet
}

const ContentSetModule: React.FC<IContentSetModuleProps> = ({ data }) => {
  const progress = (data.dislikes * 100) / (data.likes + data.dislikes)
  // @ts-ignore
  const categoryLabel = categories[data.category].label
  return (
    <div className={styles.data_module}>
      <button onClick={() => {}} className={styles.data_module__link}>
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
    </div>
  )
}

export default ContentSetModule
