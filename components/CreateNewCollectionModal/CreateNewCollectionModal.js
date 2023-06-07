import React, { useState, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { FaBookmark } from "react-icons/fa"
import CreateCollectionButton from "@/components/CreateCollectionButton/CreateCollectionButton"
import styles from "../../styles/createNewCollectionModal.module.css"

export default function CreateNewCollectionModal(props) {
  const {
    setCollectionName,
    setOverlay,
    setCreateCollectionModal,
    setIsNewCollection,
    setSelectFromFavorites,
  } = props
  const [invalidCollectionName, setInvalidCollectionName] = useState(false)
  const createCollectionRef = useRef(null)

  function handleCloseModalButton() {
    setCreateCollectionModal(false)
    setOverlay(false)
  }

  async function handleCreateCollectionButton() {
    setIsNewCollection(true)
    const collectionName = createCollectionRef.current.value

    if (collectionName.length === 0) {
      setInvalidCollectionName(true)
    } else {
      setInvalidCollectionName(false)

      setCollectionName(collectionName)

      setCreateCollectionModal(false)
      setSelectFromFavorites(true)
    }
  }

  return (
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
      {invalidCollectionName ? (
        <div className={styles.invalid_collection_name}>
          Invalid collection name, your collection name has to at least one
          character.
        </div>
      ) : null}
      <div onClick={handleCreateCollectionButton}>
        <CreateCollectionButton isDisable={false} />
      </div>
    </div>
  )
}
