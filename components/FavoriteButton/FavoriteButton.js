import React from "react"
import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import styles from "../../styles/FavoriteButton.module.css"

export default function FavoriteButton({ favorite, setFavorite }) {
  function handleFavoriteButton() {
    setFavorite(!favorite)
  }

  return (
    <div onClick={handleFavoriteButton} className={styles.favorite_button_icon}>
      {!favorite ? <FaRegHeart /> : <FaHeart style={{ color: "green" }} />}
    </div>
  )
}
