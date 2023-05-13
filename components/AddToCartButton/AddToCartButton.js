import React, { useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import styles from "../../styles/AddToCartButton.module.css"

export default function AddToCartButton() {
  const [addedToCart, setAddedToCart] = useState(false)

  function handleAddToCartClick() {
    setAddedToCart(true)
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
        <div>
          <span>
            <FaShoppingCart />
          </span>
          <span>Add to cart</span>
        </div>
      )}
    </button>
  )
}
