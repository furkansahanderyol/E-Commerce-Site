import React, { useState, useRef } from "react"
import { FaPlus } from "react-icons/fa"
import Image from "next/image"
import { BsThreeDots } from "react-icons/bs"
import { useRouter } from "next/router"
import Options from "@/components/CommonComponents/Options/Options"
import EmptyCollectionImage from "../EmptyCollectionImage/EmptyCollectionImage"
import styles from "../../../styles/collectionsPageStyles/collectionBubble.module.css"

export default function CollectionBubble({
  id,
  isDefault,
  setCreateCollectionModal,
  collectionName,
  collectionItems,
  setSelectFromFavorites,
  isNewCollection,
  setIsNewCollection,
  setCollectionId,
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
        <Options
          optionsMenu={optionsMenu}
          setOptionsMenu={setOptionsMenu}
          id={id}
          setSelectFromFavorites={setSelectFromFavorites}
          isNewCollection={isNewCollection}
          setIsNewCollection={setIsNewCollection}
          setCollectionId={setCollectionId}
          optionsRef={optionsRef}
          collectionBubbleRef={collectionBubbleRef}
        />
      </div>
      <div className={styles.collection}>
        <div className={styles.collection_images}>
          {collectionItems.length > 0 ? (
            collectionItems.map((item, index) => {
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
            })
          ) : (
            <EmptyCollectionImage />
          )}
        </div>
        <button>Go to collection</button>
      </div>
    </div>
  )
}
