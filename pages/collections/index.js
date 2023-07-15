import React, { useState, useEffect, useContext } from "react"
import FavoritesHeader from "@/components/FavoritesPageComponents/FavoritesHeader/FavoritesHeader"
import SectionHeader from "@/components/CommonComponents/SectionHeader/SectionHeader"
import axios from "axios"
import CollectionBubble from "@/components/CollectionsPageComponents/CollectionBubble/CollectionBubble"
import AvailableCollectionItems from "@/components/CollectionsPageComponents/AvailableCollectionItems/AvailableCollectionItems"
import { CollectionsContext } from "./CollectionsContext"
import CreateNewCollectionModal from "@/components/CollectionsPageComponents/CreateNewCollectionModal/CreateNewCollectionModal"
import styles from "../../styles/collectionsPageStyles/collectionsStyle.module.css"

export default function Collections({ favorites }) {
  const [collections, setCollections] = useState([])

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
    createCollectionModal,
    setCreateCollectionModal,
  } = useContext(CollectionsContext)

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
    <>
      <div className={styles.modals}>
        {createCollectionModal ? (
          <CreateNewCollectionModal
            setCollectionName={setCollectionName}
            setCreateCollectionModal={setCreateCollectionModal}
            setIsNewCollection={setIsNewCollection}
            setSelectFromFavorites={setSelectFromFavorites}
          />
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
        </div>
      </div>
    </>
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
