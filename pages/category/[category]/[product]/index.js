import React from "react"
import ProductImage from "@/components/ProductImage/ProductImage"
import styles from "../../../../styles/ProductPage.module.css"

export default function Product({ product = [] }) {
  const productImages = product.images

  return (
    <div className={styles.product_page_wrapper}>
      <div className={styles.product_info_wrapper}>
        <div className={styles.product_images_container}>
          <div className={styles.product_images}>
            <ProductImage image={productImages[0]} mini={false} />
          </div>
          <div className={styles.product_mini_images}>
            {productImages.map((image) => {
              return <ProductImage image={image} mini={true} />
            })}
          </div>
        </div>
        <div className={styles.product_info}>
          <div className={styles.product_title}>{product.title}</div>
          <div className={styles.product_description}>
            {product.description}
          </div>
          <div className={styles.buttons_container}>
            <div className={styles.add_to_cart_button}>
              <button>Add to cart</button>
            </div>
            <div className={styles.add_to_favorites_button}>
              <button>Add to favorites</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const product = params.product

  const response = await fetch(`http://localhost:3000/api/products/${product}`)
  const data = await response.json()

  return {
    props: {
      product: data.products[0],
    },
  }
}

export async function getStaticPaths(context) {
  const response = await fetch("https://dummyjson.com/products?limit=100")
  const data = await response.json()

  const value = data.products.map((product) => {
    return {
      params: {
        category: String(product.category),
        product: String(product.id),
      },
    }
  })

  return {
    paths: value,
    fallback: false,
  }
}
