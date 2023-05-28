import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styles from "../../../styles/collectionId.module.css"
import Product from "@/components/Product/Product"

export default function Collection({ collections }) {
  const [collection, setCollection] = useState([])
  const router = useRouter()
  const { collectionId } = router.query

  useEffect(() => {
    const selectedCollection = collections.filter((collection) => {
      return collection.id === collectionId
    })

    setCollection(selectedCollection)
  }, [collectionId])

  return (
    <div className={styles.collection_wrapper}>
      <div
        className={styles.collection_name}
      >{`${collection[0]?.collectionName}`}</div>
      <div className={styles.collection_products_grid}>
        {collection[0]?.items.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              id={product.id}
              title={product.title}
              brand={product.brand}
              category={product.category}
              thumbnail={product.images}
              images={product.images}
              rate={product.rating}
              count={product.stock}
              price={product.price}
              isFavorite={true}
              collection={false}
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/collections")
  const data = await response.json()

  return {
    props: {
      collections: data.collections,
    },
  }
}
