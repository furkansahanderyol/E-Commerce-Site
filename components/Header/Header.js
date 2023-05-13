import React from "react"
import { FaUser } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa"
import Link from "next/link"
import styles from "../../styles/Header.module.css"

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <Link href={"/"}>
        <h1 className={styles.header}>getScammed.com</h1>
      </Link>
      <input
        className={styles.input}
        type="text"
        placeholder="Search for a item or category"
      />
      <nav className="x">
        <ul className={styles.navigation_list}>
          <li className={styles.list_item}>
            <FaUser />
            My Account
          </li>
          <li className={styles.list_item}>
            <FaHeart />
            Favorites
          </li>
          <li className={styles.list_item}>
            <FaShoppingCart />
            Cart
          </li>
        </ul>
      </nav>
    </header>
  )
}
