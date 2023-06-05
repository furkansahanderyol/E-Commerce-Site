import React, { useState } from "react"

export const CollectionsContext = React.createContext()

export default function CollectionsProvider({ children }) {
  const [isNewCollection, setIsNewCollection] = useState(true)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectFromFavorites, setSelectFromFavorites] = useState(false)
  const [selectedItemCount, setSelectedItemCount] = useState(0)
  const [collectionName, setCollectionName] = useState("")
  const [collectionId, setCollectionId] = useState(null)

  return (
    <CollectionsContext.Provider
      value={{
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
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}
