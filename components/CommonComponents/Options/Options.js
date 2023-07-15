import React from "react"
import { FaPlus } from "react-icons/fa"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"

import styles from "../../../styles/commonComponentStyles/options.module.css"

export default function Options({
  isCollectionItem,
  optionsMenu,
  setOptionsMenu,
  id,
  setSelectFromFavorites,
  setIsNewCollection,
  setCollectionId,
  optionsRef,
  collectionBubbleRef,
  collectionItemOptions,
  setCollectionList,
  product,
  setSelectedProduct,
}) {
  function handleAddItem() {
    setSelectFromFavorites(true)
    setIsNewCollection(false)
    setCollectionId(id)
    setOptionsMenu(false)
  }

  async function handleRemoveCollection() {
    try {
      axios.delete(`http://localhost:3000/api/collections?id=${id}`)
    } catch (error) {
      console.log(error)
    }

    collectionBubbleRef.current.style.display = "none"
    setOptionsMenu(false)
  }

  function addItemToAnotherCollection() {
    setCollectionList(true)
    setSelectedProduct(product)
  }

  return isCollectionItem ? (
    collectionItemOptions ? (
      <div>
        <div ref={optionsRef} data-options className={styles.options}>
          <div
            onClick={addItemToAnotherCollection}
            className={`${styles.option} ${styles.add_item}`}
          >
            <FaPlus />
            Add item to the another collection
          </div>
          <div className={`${styles.option} ${styles.remove_item}`}>
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
    )
  ) : optionsMenu ? (
    <div>
      <div ref={optionsRef} data-options className={styles.options}>
        <div
          onClick={handleAddItem}
          className={`${styles.option} ${styles.add_item}`}
        >
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
      <div ref={optionsRef} data-options className={`${styles.options_hidden}`}>
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
  )
}
