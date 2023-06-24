import React from "react"
import { AiOutlineClose } from "react-icons/ai"
import CollectionListItem from "../CollectionListItem/CollectionListItem"
import { useRouter } from "next/router"
import styles from "../../styles/collectionList.module.css"

export default function CollectionList(props) {
  const {
    isCollectionItem,
    setNewCollectionModal,
    product,
    collectionsData,
    setCollectionList,
    setOverlay,
    isRemovable,
    setShowCreateNewCollectionModal,
    selectedProduct,
  } = props

  const router = useRouter()
  const collectionId = router.query.collectionId

  function handleCloseCollectionList() {
    isCollectionItem ? setCollectionList(false) : setCollectionList(false)

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
          isRemovable={isRemovable}
          setNewCollectionModal={setNewCollectionModal}
          setShowCreateNewCollectionModal={setShowCreateNewCollectionModal}
        />
        {isRemovable
          ? collectionsData.map((collection, index) => {
              if (collection.id !== collectionId) {
                return (
                  <CollectionListItem
                    key={index}
                    collectionId={collection.id}
                    isDefault={false}
                    collectionName={collection.collectionName}
                    collectionImage={
                      collection.items?.selectedItems[0]?.images[0]
                    }
                    product={product}
                    isRemovable={true}
                    selectedProduct={selectedProduct}
                    setCollectionList={setCollectionList}
                    setOverlay={setOverlay}
                  />
                )
              }
            })
          : collectionsData?.collections?.map((collection, index) => {
              return (
                <CollectionListItem
                  key={index}
                  collectionId={collection.id}
                  isDefault={false}
                  collectionName={collection.collectionName}
                  collectionImage={
                    collection.items?.selectedItems[0]?.images[0]
                  }
                  product={product}
                  setCollectionList={setCollectionList}
                  setOverlay={setOverlay}
                />
              )
            })}
      </div>
    </div>
  )
}
