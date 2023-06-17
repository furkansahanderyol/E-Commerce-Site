import React, { useState, useRef } from "react"
import Image from "next/image"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"
import styles from "../../styles/cartItem.module.css"

export default function CartItem(props) {
  const { product, productImage, productName, productPrice } = props
  const [quantity, setQuantity] = useState(0)
  const cartItemRef = useRef(null)

  function decreaseQuantity() {
    if (quantity === 0) return

    setQuantity((previousQuantity) => {
      return previousQuantity - 1
    })
  }

  function increaseQuantity() {
    setQuantity((previousQuantity) => {
      return previousQuantity + 1
    })
  }

  function handleRemoveItem() {
    axios.delete(`http://localhost:3000/api/cart?id=${product.id}`, {
      product,
    })

    cartItemRef.current.style.display = "none"
  }

  return (
    <div ref={cartItemRef} className={styles.cart_item_wrapper}>
      <div className={styles.product_image}>
        <Image layout="fill" src={productImage} />
      </div>
      <div className={styles.product_name}>{productName}</div>
      <div className={styles.quantity_settings}>
        <div className={styles.minus_button}>
          <button onClick={decreaseQuantity}>-</button>
        </div>
        <div className={styles.unit}>{quantity}</div>
        <div className={styles.plus_button}>
          <button onClick={increaseQuantity}>+</button>
        </div>
      </div>
      <div className={styles.price}>{productPrice}</div>
      <div onClick={handleRemoveItem} className={styles.remove_item_button}>
        <FaTrashAlt />
      </div>
    </div>
  )
}
