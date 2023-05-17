import React, { useState } from "react"
import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import axios from "axios"
import styles from "../../styles/FavoriteButton.module.css"

export default function FavoriteButton({ product, square, isFavorite }) {
  const [favorite, setFavorite] = useState(false)

  async function handleFavoriteButton(e) {
    e.stopPropagation()
    setFavorite(!favorite)

    try {
      await axios.post("http://localhost:3000/api/favorites", {
        product,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      onClick={handleFavoriteButton}
      className={
        square
          ? styles.favorite_button_icon_square
          : styles.favorite_button_icon
      }
      style={square && favorite ? { backgroundColor: "#477519" } : null}
    >
      {isFavorite ? (
        <FaHeart style={{ color: "green" }} />
      ) : !favorite ? (
        <FaRegHeart />
      ) : (
        <FaHeart
          style={square && favorite ? { color: "white" } : { color: "green" }}
        />
      )}
    </div>
  )
}
