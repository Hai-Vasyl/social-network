import React from "react"
// @ts-ignore
import styles from "../styles/title.module"

interface ITitleProps {
  Icon?: any
  title: string
}

const Title: React.FC<ITitleProps> = ({ Icon, title }) => {
  return (
    <div className={styles.title}>
      {Icon && (
        <div className={styles.title__icon}>
          <Icon />
        </div>
      )}
      <div className={styles.title__container}>
        <h2 className={styles.title__text}>{title}</h2>
        <span className={styles.title__line}></span>
      </div>
    </div>
  )
}

export default Title
