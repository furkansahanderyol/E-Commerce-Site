import React from "react"
import styles from "../../styles/ProductImage.module.css"

export default function ProductImage({ image, mini }) {
  return (
    <img
      className={mini ? styles.product_image_mini : styles.product_image}
      src={image}
      alt="Product image"
    />
  )
}
