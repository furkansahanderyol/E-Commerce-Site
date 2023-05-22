import React from "react"
import Product from "@/components/Product/Product"
import FavoritesHeader from "@/components/FavoritesHeader/FavoritesHeader"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import styles from "../../styles/FavoritePage.module.css"

export default function Favorites({ favorites }) {
  return (
    <div className={styles.favorites_wrapper}>
      <FavoritesHeader />
      {favorites.length === 0 ? (
        <SectionHeader section={"favorites"} />
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
    },
  }
}
