import React, { useState } from "react"
import styles from "../../styles/overlayContext.module.css"

export const OverlayContext = React.createContext()

export default function OverlayProvider({ children }) {
  const [overlay, setOverlay] = useState(true)

  return (
    <OverlayContext.Provider value={{ overlay, setOverlay }}>
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
