import React, { useState, useRef } from "react"
import { FaPlus } from "react-icons/fa"
import Image from "next/image"
import { BsThreeDots } from "react-icons/bs"
import { useRouter } from "next/router"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"
import styles from "../../styles/collectionBubble.module.css"

export default function CollectionBubble({
  id,
  isDefault,
  setCreateCollectionModal,
  collectionName,
  collectionItems,
}) {
  const [optionsMenu, setOptionsMenu] = useState(false)
  const router = useRouter()
  const collectionBubbleRef = useRef(null)
  const optionsRef = useRef(null)

  function handleCreateNewCollection() {
    setCreateCollectionModal(true)
  }

  function handleCollectionBubbleClick(e) {
    const target = e.target
    const isValid = optionsRef.current.contains(target)

    if (isValid) return

    if (!e.target.matches("svg")) {
      router.push(`/collections/${id}`)
    }
  }

  function handleOptionsMenuClick() {
    setOptionsMenu(!optionsMenu)
  }

  async function handleRemoveCollection() {
    try {
      axios.delete(`http://localhost:3000/api/collections?id=${id}`)
    } catch (error) {
      console.log(error)
    }

    collectionBubbleRef.current.style.display = "none"
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
    <div
      ref={collectionBubbleRef}
      onClick={handleCollectionBubbleClick}
      className={styles.collection_bubble}
    >
      <div className={styles.collection_bubble_header}>
        <div className={styles.collection_name}>{collectionName}</div>
        <BsThreeDots onClick={handleOptionsMenuClick} />
        {optionsMenu ? (
          <div>
            <div ref={optionsRef} data-options className={styles.options}>
              <div className={`${styles.option} ${styles.add_item}`}>
                <FaPlus />
                Add item to the collection
              </div>
              <div
                onClick={handleRemoveCollection}
                className={`${styles.option} ${styles.remove_item}`}
              >
                <FaTrashAlt />
                Remove item from collection
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              ref={optionsRef}
              data-options
              className={`${styles.options_hidden}`}
            >
              <div className={`${styles.option} ${styles.add_item}`}>
                <FaPlus />
                Add item to the collection
              </div>
              <div className={`${styles.option} ${styles.remove_item}`}>
                <FaTrashAlt />
                Remove item from collection
              </div>
            </div>
          </div>
        )}
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
  )
}
