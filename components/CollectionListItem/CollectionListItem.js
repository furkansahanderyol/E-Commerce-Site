import React from "react"
import { FaPlus } from "react-icons/fa"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/router"
import styles from "../../styles/collectionListItem.module.css"

export default function CollectionListItem(props) {
  const {
    collectionId,
    isDefault,
    isRemovable,
    setNewCollectionModal,
    collectionName,
    collectionImage,
    product,
    setShowCreateNewCollectionModal,
    selectedProduct,
  } = props

  const router = useRouter()
  const currentCollectionId = router.query.collectionId

  function handleCreateNewCollection() {
    isRemovable
      ? setShowCreateNewCollectionModal(true)
      : setNewCollectionModal(true)
  }

  function handleCollectionListItemClick() {
    isRemovable
      ? axios.post("http://localhost:3000/api/collections/transfer", {
          selectedCollectionId: collectionId,
          currentCollectionId,
          product: selectedProduct,
        })
      : axios.post("http://localhost:3000/api/collections/update", {
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
