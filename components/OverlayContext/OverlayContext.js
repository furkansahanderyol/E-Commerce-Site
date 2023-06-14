import React, { useState } from "react"
import styles from "../../styles/overlayContext.module.css"

export const OverlayContext = React.createContext()

export default function OverlayProvider({ children }) {
  const [overlay, setOverlay] = useState(false)
  const [createCollectionModal, setCreateCollectionModal] = useState(false)
  const [collectionList, setCollectionList] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [isCollectionListUpdated, setIsCollectionListUpdated] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <OverlayContext.Provider
      value={{
        overlay,
        setOverlay,
        createCollectionModal,
        setCreateCollectionModal,
        collectionList,
        setCollectionList,
        isCollectionListUpdated,
        setIsCollectionListUpdated,
        showFavorites,
        setShowFavorites,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {overlay && (
        <>
          <div className={styles.overlay} />
          <div>{children}</div>
        </>
      )}
      {!overlay && children}
    </OverlayContext.Provider>
  )
}
