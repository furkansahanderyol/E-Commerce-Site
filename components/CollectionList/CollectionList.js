import React from "react"
import { AiOutlineClose } from "react-icons/ai"
import CollectionListItem from "../CollectionListItem/CollectionListItem"
import styles from "../../styles/collectionList.module.css"

export default function CollectionList(props) {
  const {
    setNewCollectionModal,
    product,
    collectionsData,
    setCollectionList,
    setOverlay,
  } = props

  function handleCloseCollectionList() {
    setCollectionList(false)
    setOverlay(false)
  }

  return (
    <div className={styles.collection_list}>
      <div className={styles.collection_list_header}>
        <div>Add to collection</div>
        <div onClick={handleCloseCollectionList}>
          <AiOutlineClose />
        </div>
      </div>
      <div className={styles.collection_list_container}>
        <CollectionListItem
          isDefault={true}
          setNewCollectionModal={setNewCollectionModal}
        />
        {collectionsData?.collections?.map((collection, index) => {
          return (
            <CollectionListItem
              key={index}
              collectionId={collection.id}
              isDefault={false}
              collectionName={collection.collectionName}
              collectionImage={collection.items.selectedItems[0].images[0]}
              product={product}
            />
          )
        })}
      </div>
    </div>
  )
}
