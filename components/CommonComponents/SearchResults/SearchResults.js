import React from "react"
import styles from "../../../styles/commonComponentStyles/searchResults.module.css"

export default function SearchResults({ items, categories }) {
  return (
    <div className={styles.search_results_wrapper}>
      {items.length > 0 ? (
        <div>
          <h3 className={styles.search_header}>Items</h3>
          {items.map((item, index) => {
            if (index <= 5) {
              return (
                <div className={styles.search_item} key={index}>
                  {item.title}
                </div>
              )
            }
          })}
        </div>
      ) : null}
      {categories.length > 0 ? (
        <div>
          <h3 className={styles.search_header}>Categories</h3>
          {categories.map((category, index) => {
            if (index <= 5) {
              return (
                <div className={styles.search_item} key={index}>
                  {category}
                </div>
              )
            }
          })}
        </div>
      ) : null}
    </div>
  )
}
