import React, { useState, useEffect, useMemo } from "react"
import { FaUser } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa"
import Link from "next/link"
import SearchResults from "../SearchResults/SearchResults"
import axios from "axios"
import styles from "../../../styles/commonComponentStyles/header.module.css"

export default function Header() {
  const [search, setSearch] = useState("")
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])

  function handleSearchInput(e) {
    setSearch(e.target.value)
  }

  const searchedCategories = useMemo(() => {
    if (search === "") return
    return categories.filter((category) =>
      category.toLowerCase().includes(search.toLowerCase())
    )
  }, [categories, search])

  const searchedProducts = useMemo(() => {
    if (search === "") return
    return items.filter((product) =>
      product.title.toLowerCase().includes(search.toLocaleLowerCase())
    )
  }, [items, search])

  useEffect(() => {
    axios.get("http://localhost:3000/api/allCategories").then((response) => {
      const categories = response.data.categories
      setCategories(categories)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:3000/api/allProducts").then((response) => {
      const products = response.data.products
      setItems(products)
    })
  }, [])

  return (
    <header className={styles.wrapper}>
      <Link href={"/"}>
        <h1 className={styles.header}>getScammed.com</h1>
      </Link>
      <div className={styles.input_wrapper}>
        <input
          onChange={handleSearchInput}
          className={styles.input}
          type="text"
          placeholder="Search for a item or category"
        />
        {search === "" ? null : (
          <SearchResults
            items={searchedProducts}
            categories={searchedCategories}
          />
        )}
      </div>
      <nav className="x">
        <ul className={styles.navigation_list}>
          <Link href={"/myAccount"}>
            <li className={styles.list_item}>
              <FaUser />
              My Account
            </li>
          </Link>
          <Link href={"/favorites"}>
            <li className={styles.list_item}>
              <FaHeart />
              Favorites
            </li>
          </Link>
          <Link href={"/cart"}>
            <li className={styles.list_item}>
              <FaShoppingCart />
              Cart
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}
