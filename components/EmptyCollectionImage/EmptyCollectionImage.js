import React from "react"
import { FaBookmark } from "react-icons/fa"
import styles from "../../styles/emptyCollectionImage.module.css"

export default function EmptyCollectionImage() {
  return (
    <div className={styles.empty_collection_images}>
      <FaBookmark />
    </div>
  )
}
