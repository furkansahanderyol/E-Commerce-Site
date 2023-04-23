import React from "react"
import Product from "@/components/Product/Product"
import styles from "../styles/Home.module.css"

export default function Home({ data }) {
  return (
    <div className={styles.home_grid}>
      {data.map((product) => {
        return (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            rate={product.rating.rate}
            count={product.rating.count}
            price={product.price}
          />
        )
      })}
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://fakestoreapi.com/products")
  const data = await response.json()

  return {
    props: {
      data: data,
    },
  }
}
