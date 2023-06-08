import React, { useState } from "react"
import styles from "../../styles/overlayContext.module.css"

export const OverlayContext = React.createContext()

export default function OverlayProvider({ children }) {
  const [overlay, setOverlay] = useState(false)
  const [createCollectionModal, setCreateCollectionModal] = useState(false)
  const [collectionList, setCollectionList] = useState(false)
  const [isCollectionListUpdated, setIsCollectionListUpdated] = useState(false)

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
