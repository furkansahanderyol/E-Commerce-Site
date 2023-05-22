import React from "react"
import { FaHeart } from "react-icons/fa"
import { FaBookmark } from "react-icons/fa"
import styles from "../../styles/SectionHeader.module.css"

export default function SectionHeader({ section }) {
  return (
    <div className={styles.empty_section}>
      <div>{section === "favorites" ? <FaHeart /> : <FaBookmark />}</div>
      <div>
        {section === "favorites"
          ? "You do not have any favorite products"
          : "You do not have any collections"}
      </div>
    </div>
  )
}
