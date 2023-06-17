import React, { useRef } from "react"
import Image from "next/image"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"
import styles from "../../styles/cartItem.module.css"

export default function CartItem(props) {
  const {
    product,
    productImage,
    productName,
    productPrice,
    productQuantity,
    setCartItems,
  } = props
  const cartItemRef = useRef(null)

  function decreaseQuantity() {
    axios.post("http://localhost:3000/api/cart/decrease", {
      product,
    })

    axios.get("http://localhost:3000/api/cart").then((response) => {
      setCartItems(response.data.cart)
    })
  }

  async function increaseQuantity() {
    axios.post("http://localhost:3000/api/cart/increase", {
      product,
    })

    axios.get("http://localhost:3000/api/cart").then((response) => {
      setCartItems(response.data.cart)
    })
  }

  function handleRemoveItem() {
    axios.delete(`http://localhost:3000/api/cart?id=${product.id}`, {
      product,
    })

    axios.get("http://localhost:3000/api/cart").then((response) => {
      setCartItems(response.data.cart)
    })

    cartItemRef.current.style.display = "none"
  }

  return (
    <div ref={cartItemRef} className={styles.cart_item_wrapper}>
      <div className={styles.product_image}>
        <Image layout="fill" objectFit="cover" src={productImage} />
      </div>
      <div className={styles.product_name}>{productName}</div>
      <div className={styles.quantity_settings}>
        <div className={styles.minus_button}>
          <button onClick={decreaseQuantity}>-</button>
        </div>
        <div className={styles.unit}>{productQuantity}</div>
        <div className={styles.plus_button}>
          <button onClick={increaseQuantity}>+</button>
        </div>
      </div>
      <div className={styles.price}>{`${productPrice * productQuantity}$`}</div>
      <div onClick={handleRemoveItem} className={styles.remove_item_button}>
        <FaTrashAlt />
      </div>
    </div>
  )
}
