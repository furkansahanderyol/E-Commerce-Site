import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import AvailableCollectionItems from "@/components/AvailableCollectionItems/AvailableCollectionItems"
import styles from "../../../styles/collectionId.module.css"
import { CollectionsContext } from "../CollectionsContext"
import Product from "@/components/Product/Product"

export default function Collection({ collections, favorites }) {
  const [collection, setCollection] = useState([])
  const router = useRouter()
  const { collectionId } = router.query

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
    // collectionId,
    // setCollectionId,
  } = useContext(CollectionsContext)

  useEffect(() => {
    const selectedCollection = collections.filter((collection) => {
      return collection.id === collectionId
    })

    setCollection(selectedCollection)
  }, [collectionId])

  function test() {
    setSelectFromFavorites(true)
  }

  return (
    <div className={styles.collection_wrapper}>
      <div className={styles.collection_header}>
        <div
          className={styles.collection_name}
        >{`${collection[0]?.collectionName}`}</div>
        <div onClick={test} className={styles.add_collection_button}>
          <button>Add item</button>
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
            />
          )
        })}
      </div>
      {selectFromFavorites ? (
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
        />
      ) : null}
    </div>
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
