import React from "react"
import Link from "next/link"
import styles from "../../../styles/commonComponentStyles/searchResults.module.css"

export default function SearchResults({ items, categories }) {
  return (
    <div className={styles.search_results_wrapper}>
      {items.length > 0 ? (
        <div>
          <h3 className={styles.search_header}>Items</h3>
          <div className={styles.searched_items}>
            {items.map((item, index) => {
              if (index <= 5) {
                return (
                  <Link
                    href={`/category/${item.category}/${item.id}`}
                    key={item.id}
                  >
                    <div className={styles.search_item}>{item.title}</div>
                  </Link>
                )
              }
            })}
          </div>
        </div>
      ) : null}
      {categories.length > 0 ? (
        <div>
          <h3 className={styles.search_header}>Categories</h3>
          <div className={styles.searched_items}>
            {categories.map((category, index) => {
              if (index <= 5) {
                return (
                  <Link href={`/category/${category}`} key={index}>
                    <div className={styles.search_item}>{category}</div>
                  </Link>
                )
              }
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
