import React, { useState } from "react"
import ProductImage from "@/components/ProductImage/ProductImage"
import Stars from "@/components/Stars/Stars"
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton"
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton"
import styles from "../../../../styles/ProductPage.module.css"

export default function Product({ product = [] }) {
  const [productImage, setProductImage] = useState(0)
  const productImages = product.images

  return (
    <div className={styles.product_page_wrapper}>
      <div className={styles.product_info_wrapper}>
        <div className={styles.product_images_container}>
          <div className={styles.product_images}>
            <ProductImage
              image={productImages[productImage]}
              mini={false}
              productImage={productImage}
              setProductImage={setProductImage}
              totalImageCount={productImages.length}
            />
          </div>
          <div className={styles.product_mini_images}>
            {productImages.map((image, index) => {
              return (
                <ProductImage
                  key={index}
                  index={index}
                  image={image}
                  mini={true}
                  productImage={productImage}
                  setProductImage={setProductImage}
                  totalImageCount={productImages.length}
                />
              )
            })}
          </div>
        </div>
        <div className={styles.product_info}>
          <div className={styles.product_title}>{product.title}</div>
          <div className={styles.product_description}>
            {product.description}
          </div>
          <div className={styles.rating}>
            <div className={styles.stars}>
              <Stars rate={product.rating} />
            </div>
            <div className={styles.point}>{`(${product.rating})`}</div>
          </div>
          <div className={styles.buttons_container}>
            <div className={styles.add_to_cart_button}>
              <AddToCartButton />
            </div>
            <div className={styles.add_to_favorites_button}>
              <FavoriteButton square={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
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

// export async function getStaticPaths(context) {
//   const response = await fetch("https://dummyjson.com/products?limit=100")
//   const data = await response.json()

//   const value = data.products.map((product) => {
//     return {
//       params: {
//         category: String(product.category),
//         product: String(product.id),
//       },
//     }
//   })

//   return {
//     paths: value,
//     fallback: false,
//   }
// }