import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import AvailableCollectionItems from "@/components/AvailableCollectionItems/AvailableCollectionItems"
import { CollectionsContext } from "../CollectionsContext"
import { OverlayContext } from "@/components/OverlayContext/OverlayContext"
import CollectionList from "@/components/CollectionList/CollectionList"
import Product from "@/components/Product/Product"
import CreateNewCollectionModal from "@/components/CreateNewCollectionModal/CreateNewCollectionModal"
import styles from "../../../styles/collectionId.module.css"

export default function Collection({ collections, favorites }) {
  const [collection, setCollection] = useState([])
  const [showCreateNewCollectionModal, setShowCreateNewCollectionModal] =
    useState(false)
  const router = useRouter()
  const { collectionId } = router.query

  const {
    selectedItems,
    setSelectedItems,
    selectFromFavorites,
    setSelectFromFavorites,
    selectedItemCount,
    collectionName,
    setCollectionName,
  } = useContext(CollectionsContext)

  const {
    overlay,
    setOverlay,
    collectionList,
    setCollectionList,
    showFavorites,
    setShowFavorites,
    selectedProduct,
    setSelectedProduct,
  } = useContext(OverlayContext)

  useEffect(() => {
    const selectedCollection = collections.filter((collection) => {
      return collection.id === collectionId
    })

    setCollection(selectedCollection)
  }, [collectionId])

  function handleAddItemClick() {
    setOverlay(true)
    setShowFavorites(true)
  }

  useEffect(() => {
    console.log("selectedProduct", selectedProduct)
  }, [selectedProduct])

  return (
    <>
      <div className={styles.collection_wrapper}>
        <div className={styles.collection_header}>
          <div
            className={styles.collection_name}
          >{`${collection[0]?.collectionName}`}</div>
          <div className={styles.add_collection_button}>
            <button onClick={handleAddItemClick}>Add item</button>
          </div>
        </div>
        <div className={styles.collection_products_grid}>
          {collection[0]?.items.selectedItems.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                id={product.id}
                title={product.title}
                brand={product.brand}
                category={product.category}
                thumbnail={product.images}
                images={product.images}
                rate={product.rating}
                count={product.stock}
                price={product.price}
                isFavorite={true}
                collection={false}
                isRemovable={true}
                setOverlay={setOverlay}
                setCollectionList={setCollectionList}
                setSelectedProduct={setSelectedProduct}
              />
            )
          })}
        </div>
        {showFavorites ? (
          <AvailableCollectionItems
            isInsideOfCollection={true}
            isNewCollection={false}
            favorites={favorites}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectFromFavorites={selectFromFavorites}
            setSelectFromFavorites={setSelectFromFavorites}
            selectedItemCount={selectedItemCount}
            collectionName={collectionName}
            setCollectionName={setCollectionName}
            collectionId={collectionId}
            setOverlay={setOverlay}
            setShowFavorites={setShowFavorites}
            isRemovable={isRemovable}
          />
        ) : null}
      </div>
      {collectionList ? (
        <CollectionList
          isCollectionItem={true}
          setOverlay={setOverlay}
          isRemovable={true}
          setCollectionList={setCollectionList}
          setShowCreateNewCollectionModal={setShowCreateNewCollectionModal}
        />
      ) : null}
      {showCreateNewCollectionModal ? (
        <CreateNewCollectionModal
          isRemovable={true}
          setOverlay={setOverlay}
          setShowCreateNewCollectionModal={setShowCreateNewCollectionModal}
          selectedProduct={selectedProduct}
          collectionId={collectionId}
        />
      ) : null}
    </>
  )
}

export async function getServerSideProps() {
  const collectionResponse = await fetch(
    "http://localhost:3000/api/collections"
  )
  const favoritesResponse = await fetch("http://localhost:3000/api/favorites")
  const collectionsData = await collectionResponse.json()
  const favoritesData = await favoritesResponse.json()

  return {
    props: {
      collections: collectionsData.collections,
      favorites: favoritesData.favorites,
    },
  }
}
