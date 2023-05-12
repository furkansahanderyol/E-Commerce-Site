import React, { useState } from "react"
import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import styles from "../../styles/FavoriteButton.module.css"

export default function FavoriteButton({ square }) {
  const [favorite, setFavorite] = useState(false)

  function handleFavoriteButton() {
    setFavorite(!favorite)
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
      {!favorite ? (
        <FaRegHeart />
      ) : (
        <FaHeart
          style={square && favorite ? { color: "white" } : { color: "green" }}
        />
      )}
    </div>
  )
}
