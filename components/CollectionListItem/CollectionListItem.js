import React from "react"
import { FaPlus } from "react-icons/fa"
import Image from "next/image"
import styles from "../../styles/collectionListItem.module.css"

export default function CollectionListItem({
  isDefault,
  collectionName,
  collectionImage,
}) {
  return isDefault ? (
    <div className={styles.default_collection}>
      <FaPlus />
      Create new collection
    </div>
  ) : (
    <div className={styles.collection_list_item}>
      <div>
        <Image
          src={collectionImage}
          width={40}
          height={40}
          alt="Collection image"
        />
      </div>
      <div>{collectionName}</div>
    </div>
  )
}
