import React, { useState, useRef } from "react"
import FavoritesHeader from "@/components/FavoritesHeader/FavoritesHeader"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import { FaPlus } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"
import { FaBookmark } from "react-icons/fa"
import axios from "axios"
import styles from "../../styles/Collections.module.css"

export default function Collections({ collections }) {
  const [createCollectionModal, setCreateCollectionModal] = useState(false)
  const createCollectionRef = useRef(null)

  function handleCreateNewCollection() {
    setCreateCollectionModal(true)
  }

  function handleCloseModalButton() {
    setCreateCollectionModal(false)
  }

  async function handleCreateCollectionButton() {
    const collectionName = createCollectionRef.current.value

    try {
      axios.post("http://localhost:3000/api/collections", { collectionName })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.collections_wrapper}>
        <FavoritesHeader />
        <SectionHeader section={"collections"} />
        <div
          onClick={handleCreateNewCollection}
          className={styles.create_new_collection_button}
        >
          <FaPlus />
          <div>Create new collection</div>
        </div>
        <div className={styles.collections}></div>
        {createCollectionModal ? (
          <div className={styles.create_new_collection_modal}>
            <div
              onClick={handleCloseModalButton}
              className={styles.modal_close_button}
            >
              <AiOutlineClose />
            </div>
            <div className={styles.bookmark_icon}>
              <FaBookmark />
            </div>
            <div className={styles.modal_header_and_input_wrapper}>
              <div className={styles.create_new_collection_header}>
                Give a name to your collection
              </div>
              <input
                ref={createCollectionRef}
                className={styles.create_new_collection_input}
                type={"text"}
              />
            </div>
            <button
              onClick={handleCreateCollectionButton}
              className={styles.create_new_collection_submit_button}
              type={"submit"}
            >
              Create collection
            </button>
          </div>
        ) : null}
      </div>
      {createCollectionModal ? <div className={styles.overlay}></div> : null}
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/collections")
  const data = await response.json()

  return {
    props: {
      collections: data.collections,
    },
  }
}
