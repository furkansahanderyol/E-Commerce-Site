import React, { useState } from "react"
import { FaHeart } from "react-icons/fa"
import { FaBookmark } from "react-icons/fa"
import Product from "@/components/Product/Product"
import styles from "../styles/FavoritePage.module.css"

export default function Favorites({ favorites, collections }) {
  const [section, setSection] = useState(true)

  function handleFavoritesSectionClick() {
    setSection(true)
  }

  function handleCollectionsSectionClick() {
    setSection(false)
  }

  return (
    <div className={styles.favorites_wrapper}>
      <div className={styles.section_buttons}>
        <div
          onClick={handleFavoritesSectionClick}
          className={
            section
              ? `${styles.section_button} ${styles.section_button_selected} `
              : styles.section_button
          }
        >
          <FaHeart />
          <div>Favorites</div>
        </div>
        <div
          onClick={handleCollectionsSectionClick}
          className={
            !section
              ? `${styles.section_button} ${styles.section_button_selected}`
              : styles.section_button
          }
        >
          <FaBookmark />
          <div>Collection</div>
        </div>
      </div>
      {section ? (
        favorites.length === 0 ? (
          <div className={styles.empty_section}>
            <div>
              <FaHeart />
            </div>
            <div>You do not have any favorite products</div>
          </div>
        ) : (
          <div className={styles.favorite_products}>
            {favorites.map((product, index) => {
              return (
                <Product
                  key={index}
                  product={product.product}
                  id={product.product.id}
                  title={product.product.title}
                  brand={product.product.brand}
                  category={product.product.category}
                  thumbnail={product.product.thumbnail}
                  images={product.product.images}
                  rate={product.product.rating}
                  count={product.product.rating.count}
                  price={product.product.price}
                  isFavorite={true}
                />
              )
            })}
          </div>
        )
      ) : collections.length === 0 ? (
        <div className={styles.empty_section}>
          <div>
            <FaBookmark />
          </div>
          <div>You do not have any collection</div>
        </div>
      ) : (
        <div>Collections</div>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/favorites")
  const data = await response.json()
  return {
    props: {
      favorites: data.favorites,
      collections: data.collections,
    },
  }
}
