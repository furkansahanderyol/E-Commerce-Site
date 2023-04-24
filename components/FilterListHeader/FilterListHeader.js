import React from "react"
import { MdKeyboardArrowUp } from "react-icons/md"
import { MdKeyboardArrowDown } from "react-icons/md"
import styles from "../../styles/filterListHeader.module.css"

export default function FilterListHeader({ brandsList }) {
  return (
    <div className={styles.filter_title}>
      <span>Featured brands</span>
      <span className={styles.filter_title_arrow}>
        {brandsList ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </span>
    </div>
  )
}
