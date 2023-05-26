import React from "react"
import { FaPlus } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/collectionBubble.module.css"

export default function CollectionBubble({
  id,
  isDefault,
  setCreateCollectionModal,
  collectionName,
  collectionItems,
}) {
  function handleCreateNewCollection() {
    setCreateCollectionModal(true)
  }

  return isDefault ? (
    <div
      onClick={handleCreateNewCollection}
      className={styles.create_new_collection_button}
    >
      <FaPlus />
      <div>Create new collection</div>
    </div>
  ) : (
    <Link href={`/collections/${id}`}>
      <div className={styles.collection_bubble}>
        <div className={styles.collection_bubble_header}>
          <div className={styles.collection_name}>{collectionName}</div>
        </div>
        <div className={styles.collection}>
          <div className={styles.collection_images}>
            {collectionItems.map((item, index) => {
              while (index < 5) {
                return (
                  <Image
                    key={index}
                    src={item.images[0]}
                    width="30"
                    height="40"
                    alt="Product image"
                  />
                )
              }
            })}
          </div>
          <button>Go to collection</button>
        </div>
      </div>
    </Link>
  )
}
