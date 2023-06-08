import React from "react"
import { FaPlus } from "react-icons/fa"
import Image from "next/image"
import axios from "axios"
import styles from "../../styles/collectionListItem.module.css"

export default function CollectionListItem(props) {
  const {
    collectionId,
    isDefault,
    setNewCollectionModal,
    collectionName,
    collectionImage,
    product,
  } = props

  function handleCreateNewCollection() {
    setNewCollectionModal(true)
  }

  function handleCollectionListItemClick() {
    axios.post("http://localhost:3000/api/collections/update", {
      selectedCollectionId: collectionId,
      product: product,
    })
  }

  return isDefault ? (
    <div
      onClick={handleCreateNewCollection}
      className={styles.default_collection}
    >
      <FaPlus />
      Create new collection
    </div>
  ) : (
    <div
      onClick={handleCollectionListItemClick}
      className={styles.collection_list_item}
    >
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
