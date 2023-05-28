import React, { useState, useRef, useEffect, use } from "react"
import FavoritesHeader from "@/components/FavoritesHeader/FavoritesHeader"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import { AiOutlineClose } from "react-icons/ai"
import { FaBookmark } from "react-icons/fa"
import axios from "axios"
import Product from "@/components/Product/Product"
import CreateCollectionButton from "@/components/CreateCollectionButton/CreateCollectionButton"
import CollectionBubble from "@/components/CollectionBubble/CollectionBubble"
import styles from "../../styles/collections.module.css"

export default function Collections({ favorites }) {
  const [collections, setCollections] = useState([])
  const [createCollectionModal, setCreateCollectionModal] = useState(false)
  const [collectionName, setCollectionName] = useState("")
  const [selectFromFavorites, setSelectFromFavorites] = useState(false)
  const [selectedItemCount, setSelectedItemCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const [invalidCollectionName, setInvalidCollectionName] = useState(false)
  const createCollectionRef = useRef(null)

  function handleCreateNewCollection() {
    setCreateCollectionModal(true)
  }

  function handleCloseModalButton() {
    setCreateCollectionModal(false)
  }

  async function handleCreateCollectionButton() {
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

  function handleSelectCollectionItemsCloseButton() {
    setSelectFromFavorites(false)
    setSelectedItems([])
  }

  console.log(favorites)

  async function createNewCollection() {
    if (favorites.length === 0) return

    try {
      axios.post("http://localhost:3000/api/collections", {
        collectionName,
        selectedItems,
      })
    } catch (error) {
      console.log(error)
    }

    setSelectFromFavorites(false)
    setCollectionName("")
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
                    collectionItems={collection.items}
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
          <div className={styles.select_collection_items}>
            <div className={styles.select_from_collection_items_header}>
              Select items from your favorites
              <AiOutlineClose
                onClick={handleSelectCollectionItemsCloseButton}
              />
            </div>
            <div>{`You selected ${selectedItemCount} items`}</div>
            {favorites.length === 0 ? (
              <div>
                You should have at least one favorite item to create collection
              </div>
            ) : (
              <div className={styles.select_favorites_grid}>
                {favorites.map((favoriteProduct) => {
                  return (
                    <Product
                      key={favoriteProduct.product.id}
                      product={favoriteProduct.product}
                      id={favoriteProduct.product.id}
                      title={favoriteProduct.product.title}
                      brand={favoriteProduct.product.brand}
                      category={favoriteProduct.product.category}
                      thumbnail={favoriteProduct.product.images}
                      images={favoriteProduct.product.images}
                      rate={favoriteProduct.product.rating}
                      count={favoriteProduct.product.stock}
                      price={favoriteProduct.product.price}
                      isFavorite={true}
                      collection={true}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />
                  )
                })}
              </div>
            )}
            <div
              className={styles.create_collection_button_wrapper}
              onClick={createNewCollection}
            >
              <CreateCollectionButton
                isDisable={favorites.length === 0 ? true : false}
              />
            </div>
          </div>
        ) : null}
      </div>
      {createCollectionModal || selectFromFavorites ? (
        <div className={styles.overlay}></div>
      ) : null}
    </div>
  )
}

export async function getServerSideProps() {
  const collectionsResponse = await fetch(
    "http://localhost:3000/api/collections"
  )
  const favoritesResponse = await fetch("http://localhost:3000/api/favorites")
  const collectionsData = await collectionsResponse.json()
  const favoritesData = await favoritesResponse.json()

  return {
    props: {
      favorites: favoritesData.favorites,
    },
  }
}
