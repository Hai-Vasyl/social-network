import React from "react"
import { categories } from "../modules/contentCategories"
// @ts-ignore
import styles from "../styles/categories.module"
import Category from "./Category"

const CategoryModule: React.FC = () => {
  return (
    <div className={styles.container}>
      {Object.keys(categories).map((item, index) => {
        // @ts-ignore
        const category = categories[item]
        return <Category category={category} index={index} />
      })}
    </div>
  )
}

export default CategoryModule
