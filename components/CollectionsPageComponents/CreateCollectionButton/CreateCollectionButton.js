import React from "react"
import styles from "../../../styles/collectionsPageStyles/createCollectionButton.module.css"

export default function CreateCollectionButton({ isDisable }) {
  return (
    <button
      className={
        isDisable
          ? styles.create_collection_button_disabled
          : styles.create_collection_button
      }
      type="submit"
    >
      Create new collection
    </button>
  )
}
