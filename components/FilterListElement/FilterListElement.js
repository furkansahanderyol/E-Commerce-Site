import React from "react"
import styles from "../../styles/filterListElement.module.css"

export default function FilterListElement({ brand }) {
  return (
    <div className={styles.filter_list_element}>
      <input type="checkbox" id={brand} name={brand} value={brand} />
      <label htmlFor={brand}>{brand}</label>
    </div>
  )
}
