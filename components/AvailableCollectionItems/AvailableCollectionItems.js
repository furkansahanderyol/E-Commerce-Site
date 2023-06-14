import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { AiOutlineClose } from "react-icons/ai"
import CreateCollectionButton from "../CreateCollectionButton/CreateCollectionButton"
import Product from "../Product/Product"
import axios from "axios"
import styles from "../../styles/availableCollectionItems.module.css"

export default function AvailableCollectionItems({
  isInsideOfCollection,
  isNewCollection,
  favorites,
  selectedItems,
  setSelectedItems,
  selectFromFavorites,
  setSelectFromFavorites,
  selectedItemCount,
  collectionName,
  setCollectionName,
  collectionId,
  setOverlay,
  setShowFavorites,
  isRemovable,
}) {
  const [availableItems, setAvailableItems] = useState()
  const [updateItems, setUpdateItems] = useState([])
  const router = useRouter()

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
    setOverlay(false)
    isRemovable ? setShowFavorites(false) : null
  }

  function handleSelectCollectionItemsCloseButton() {
    setSelectFromFavorites(false)
    setSelectedItems([])
    setOverlay(false)
    isRemovable ? setShowFavorites(false) : null
  }

  async function updateNewCollection() {
    try {
      axios.post(`http://localhost:3000/api/collections?id=${collectionId}`, {
        updateItems,
      })
    } catch (error) {
      console.log(error)
    }

    setSelectFromFavorites(false)
    isRemovable ? setShowFavorites(false) : null

    isInsideOfCollection ? router.reload() : null
  }

  useEffect(() => {
    axios.get("http://localhost:3000/api/collections").then((response) => {
      const items = response.data.collections.filter((collection) => {
        return collection.id === collectionId
      })

      const collectionItems = items[0]?.items.selectedItems

      const availableItems = favorites.filter((favorite) => {
        return !collectionItems?.some((item) => item.id === favorite.product.id)
      })

      setSelectedItems([])
      setAvailableItems(availableItems)
    })
  }, [collectionId])

  return isNewCollection ? (
    <div className={styles.select_collection_items}>
      <div className={styles.select_from_collection_items_header}>
        Select items from your favorites
        <AiOutlineClose onClick={handleSelectCollectionItemsCloseButton} />
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
  ) : (
    <div className={styles.select_collection_items}>
      <div className={styles.select_from_collection_items_header}>
        Select items from your favorites
        <AiOutlineClose onClick={handleSelectCollectionItemsCloseButton} />
      </div>
      <div>{`You selected ${selectedItemCount} items`}</div>
      {favorites.length === 0 ? (
        <div>
          You should have at least one favorite item to create collection
        </div>
      ) : (
        <div className={styles.select_favorites_grid}>
          {availableItems?.map((favoriteProduct) => {
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
                isUpdate={true}
                setUpdateItems={setUpdateItems}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            )
          })}
        </div>
      )}
      <div
        className={styles.create_collection_button_wrapper}
        onClick={updateNewCollection}
      >
        <CreateCollectionButton
          isDisable={favorites.length === 0 ? true : false}
        />
      </div>
    </div>
  )
}
