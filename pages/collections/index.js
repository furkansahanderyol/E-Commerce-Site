import React, { useState, useRef } from "react"
import FavoritesHeader from "@/components/FavoritesHeader/FavoritesHeader"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import { FaPlus } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"
import { FaBookmark } from "react-icons/fa"
import axios from "axios"
import Product from "@/components/Product/Product"
import styles from "../../styles/Collections.module.css"

export default function Collections({ collections, favorites }) {
  const [createCollectionModal, setCreateCollectionModal] = useState(false)
  const [selectFromFavorites, setSelectFromFavorites] = useState(false)
  const [selectedItemCount, setSelectedItemCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
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

    setCreateCollectionModal(false)
    setSelectFromFavorites(true)
  }

  function handleSelectCollectionItemsCloseButton() {
    setSelectFromFavorites(false)
    setSelectedItems([])
  }

  function createNewCollection() {
    try {
      axios.post("http://localhost:3000/api/collections", { selectedItems })
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
            <div className={styles.create_collection_button}>
              <button onClick={createNewCollection} type="submit">
                Crate new collection
              </button>
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
      collections: collectionsData.collections,
      favorites: favoritesData.favorites,
    },
  }
}
