import React, { useEffect, useRef } from "react"
import styles from "../../styles/filterListElement.module.css"

export default function FilterListElement({ brand, selectedBrands }) {
  const filterText = useRef()
  const checkboxRef = useRef()

  useEffect(() => {
    selectedBrands.includes(filterText.current.textContent)
      ? (checkboxRef.current.checked = true)
      : (checkboxRef.current.checked = false)
  }, [selectedBrands])

  return (
    <div className={styles.filter_list_element}>
      <input
        ref={checkboxRef}
        type="checkbox"
        id={brand}
        name={brand}
        value={brand}
      />
      <label ref={filterText} htmlFor={brand}>
        {brand}
      </label>
    </div>
  )
}
