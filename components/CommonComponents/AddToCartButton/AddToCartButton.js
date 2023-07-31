import React, { useState, useEffect } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import axios from "axios"
import styles from "../../../styles/commonComponentStyles/addToCartButton.module.css"

export default function AddToCartButton({ product }) {
  const [addedToCart, setAddedToCart] = useState(false)

  function handleAddToCartClick() {
    setAddedToCart(true)
  }

  async function checkIfItemIsAlreadyAdded() {
    axios.get("http://localhost:3000/api/cart").then((response) => {
      const items = response.data.cart
      const checkProduct = items.some((item) => {
        return item.id === product.id
      })

      checkProduct ? setAddedToCart(true) : setAddedToCart(false)
    })
  }

  useEffect(() => {
    checkIfItemIsAlreadyAdded()
  }, [])

  async function handleAddToCart() {
    axios.post("http://localhost:3000/api/cart", {
      product,
    })
  }

  return (
    <button
      onClick={handleAddToCartClick}
      className={addedToCart ? styles.added_to_cart : styles.add_to_cart}
    >
      {addedToCart ? (
        <div>
          <span>
            <FaCheck />
          </span>
          <span>Added to cart</span>
        </div>
      ) : (
        <div onClick={handleAddToCart}>
          <span>
            <FaShoppingCart />
          </span>
          <span>Add to cart</span>
        </div>
      )}
    </button>
  )
}
