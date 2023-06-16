import React from "react"
import Image from "next/image"
import { FaTrashAlt } from "react-icons/fa"
import styles from "../../styles/cartItem.module.css"

export default function CartItem(props) {
  const { productImage, productName, productPrice } = props

  return (
    <div className={styles.cart_item_wrapper}>
      <div className={styles.product_image}>
        <Image src={productImage} />
      </div>
      <div className={styles.product_name}>{productName}</div>
      <div className={styles.quantity_settings}>
        <div className={styles.minus_button}>
          <button>-</button>
        </div>
        <div className={styles.unit}>0</div>
        <div className={styles.plus_button}>
          <button>-</button>
        </div>
      </div>
      <div className={styles.price}>{productPrice}</div>
      <div className={styles.remove_item_button}>
        <FaTrashAlt />
      </div>
    </div>
  )
}
