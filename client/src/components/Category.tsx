import React from "react"
import { Link } from "react-router-dom"
import { ICategory } from "../interfaces"
// @ts-ignore
import styles from "../styles/categories.module"

interface ICategoryProps {
  category: ICategory
  index: number
}

const Category: React.FC<ICategoryProps> = ({ category, index }) => {
  return (
    <Link to={`/categories/${category.keyWord}`} className={styles.category}>
      <img
        className={styles.category__image}
        src={category.bgImg}
        alt='bgImage'
      />
      <div className={styles.category__overlay}></div>
      <span className={styles.category__label}>
        <span>{category.label}</span>
      </span>
      <div className={styles.category__wrapper_counter}>
        <span className={styles.category__counter}>
          - {index < 10 && "0"}
          {index}
        </span>
      </div>
    </Link>
  )
}

export default Category
