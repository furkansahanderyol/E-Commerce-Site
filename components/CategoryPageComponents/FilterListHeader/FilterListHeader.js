import React from "react"
import { MdKeyboardArrowUp } from "react-icons/md"
import { MdKeyboardArrowDown } from "react-icons/md"
import styles from "../../../styles/categoryPageStyles/filterListHeader.module.css"

export default function FilterListHeader({ header, list }) {
  return (
    <div className={styles.filter_title}>
      <span>{header}</span>
      <span className={styles.filter_title_arrow}>
        {list ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </span>
    </div>
  )
}
