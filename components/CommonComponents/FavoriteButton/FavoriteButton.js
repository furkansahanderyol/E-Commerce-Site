import React, { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import axios from "axios"
import styles from "../../../styles/commonComponentStyles/favoriteButton.module.css"

export default function FavoriteButton({
  product,
  square,
  isFavorite,
  notifications,
  setNotifications,
  isRemovable,
}) {
  const [checkFavorite, setCheckFavorite] = useState()

  useEffect(() => {
    isFavorite ? setCheckFavorite(true) : setCheckFavorite(false)
  }, [isFavorite])

  async function handleFavoriteButton(e) {
    e.stopPropagation()

    if (!checkFavorite) {
      setCheckFavorite(true)
      try {
        await axios.post("http://localhost:3000/api/favorites", {
          product,
        })
        setNotifications([...notifications, true])
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        setCheckFavorite(false)
        await axios.delete("http://localhost:3000/api/favorites", {
          data: product,
        })
        setNotifications([...notifications, false])
      } catch (error) {
        console.log(error)
      }
    }
  }

  return square ? (
    <div
      onClick={handleFavoriteButton}
      className={
        checkFavorite
          ? styles.favorite_button_icon_square_selected
          : styles.favorite_button_icon_square
      }
    >
      {checkFavorite ? <FaHeart /> : <FaRegHeart />}
    </div>
  ) : (
    <div
      onClick={handleFavoriteButton}
      className={
        checkFavorite
          ? isRemovable
            ? styles.favorite_button_icon_selected_removable
            : styles.favorite_button_icon_selected
          : isRemovable
          ? styles.favorite_button_icon_removable
          : styles.favorite_button_icon
      }
    >
      {checkFavorite ? <FaHeart /> : <FaRegHeart />}
    </div>
  )
}
