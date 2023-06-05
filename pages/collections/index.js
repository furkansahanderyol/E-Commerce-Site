import React, { useState, useRef, useEffect, useContext } from "react"
import FavoritesHeader from "@/components/FavoritesHeader/FavoritesHeader"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import { AiOutlineClose } from "react-icons/ai"
import { FaBookmark } from "react-icons/fa"
import axios from "axios"
import CreateCollectionButton from "@/components/CreateCollectionButton/CreateCollectionButton"
import CollectionBubble from "@/components/CollectionBubble/CollectionBubble"
import AvailableCollectionItems from "@/components/AvailableCollectionItems/AvailableCollectionItems"
import { CollectionsContext } from "./CollectionsContext"
import styles from "../../styles/collections.module.css"

export default function Collections({ favorites }) {
  const [collections, setCollections] = useState([])
  const [createCollectionModal, setCreateCollectionModal] = useState(false)
  const [invalidCollectionName, setInvalidCollectionName] = useState(false)
  const createCollectionRef = useRef(null)

  const {
    isNewCollection,
    setIsNewCollection,
    selectedItems,
    setSelectedItems,
    selectFromFavorites,
    setSelectFromFavorites,
    selectedItemCount,
    setSelectedItemCount,
    collectionName,
    setCollectionName,
    collectionId,
    setCollectionId,
  } = useContext(CollectionsContext)

  function handleCloseModalButton() {
    setCreateCollectionModal(false)
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

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/api/collections").then((response) => {
        setCollections(response.data.collections)
      })
    } catch (error) {
      console.log(error)
    }
  }, [selectFromFavorites])

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/api/collections").then((response) => {
        setCollections(response.data.collections)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    setSelectedItemCount(selectedItems.length)
  }, [selectedItems])

  return (
    <div className={styles.container}>
      <div className={styles.collections_wrapper}>
        <FavoritesHeader />
        <SectionHeader section={"collections"} />
        <CollectionBubble
          isDefault={true}
          setCreateCollectionModal={setCreateCollectionModal}
        />
        <div className={styles.collections_grid}>
          {collections.length > 0
            ? collections.map((collection, index) => {
                return (
                  <CollectionBubble
                    key={index}
                    id={collection.id}
                    isDefault={false}
                    collectionName={collection.collectionName}
                    collectionItems={collection.items.selectedItems}
                    setSelectFromFavorites={setSelectFromFavorites}
                    isNewCollection={isNewCollection}
                    setIsNewCollection={setIsNewCollection}
                    setCollectionId={setCollectionId}
                  />
                )
              })
            : null}
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
            {invalidCollectionName ? (
              <div className={styles.invalid_collection_name}>
                Invalid collection name, your collection name has to at least
                one character.
              </div>
            ) : null}
            <div onClick={handleCreateCollectionButton}>
              <CreateCollectionButton isDisable={false} />
            </div>
          </div>
        ) : null}
        {selectFromFavorites ? (
          <AvailableCollectionItems
            isNewCollection={isNewCollection}
            favorites={favorites}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectFromFavorites={selectFromFavorites}
            setSelectFromFavorites={setSelectFromFavorites}
            selectedItemCount={selectedItemCount}
            collectionName={collectionName}
            setCollectionName={setCollectionName}
            collectionId={collectionId}
          />
        ) : null}
      </div>
      {createCollectionModal || selectFromFavorites ? (
        <div className={styles.overlay}></div>
      ) : null}
    </div>
  )
}

export async function getServerSideProps() {
  const favoritesResponse = await fetch("http://localhost:3000/api/favorites")
  const favoritesData = await favoritesResponse.json()

  return {
    props: {
      favorites: favoritesData.favorites,
    },
  }
}
