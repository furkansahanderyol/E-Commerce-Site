import React, { useState } from "react"
import Image from "next/image"
import Stars from "../Stars/Stars"
import FavoriteButton from "../FavoriteButton/FavoriteButton"
import styles from "../../styles/Product.module.css"

export default function Product(props) {
  const { id, image, title, rate, count, price } = props
  const [favorite, setFavorite] = useState(false)

  return (
    <div className={styles.product} id={id}>
      <div className={styles.favorite_button_wrapper}>
        <FavoriteButton favorite={favorite} setFavorite={setFavorite} />
      </div>
      <div className={styles.product_image_wrapper}>
        <Image src={image} width={200} height={250} alt="Product image" />
      </div>
      <div className={styles.product_information}>
        <div className={styles.product_title}>{title}</div>
        <div className={styles.rate}>
          <div>
            <Stars rate={rate} />
          </div>
          <div className={styles.count}>{`(${count})`}</div>
        </div>
        <div className={styles.price}>{`${price} $`}</div>
      </div>
    </div>
  )
}
