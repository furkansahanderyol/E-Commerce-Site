import React from "react"
import { FaHeart } from "react-icons/fa"
import { FaBookmark } from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../../styles/favoritesPageStyles/favoritesHeader.module.css"

export default function FavoritesHeader() {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <div className={styles.section_buttons}>
      <Link href="/favorites">
        <div
          className={
            pathname === "/favorites"
              ? `${styles.section_button} ${styles.section_button_selected} `
              : `${styles.section_button}`
          }
        >
          <FaHeart />
          <div>Favorites</div>
        </div>
      </Link>
      <Link href="/collections">
        <div
          className={
            pathname === "/collections"
              ? `${styles.section_button} ${styles.section_button_selected} `
              : `${styles.section_button}`
          }
        >
          <FaBookmark />
          <div>Collection</div>
        </div>
      </Link>
    </div>
  )
}
