import React, { useState, useEffect } from "react"
import axios from "axios"
import Category from "@/components/HomepageComponents/Category/Category"
import styles from "../styles/homePageStyles/home.module.css"

export default function index({ categories }) {
  const [categoriesArray, setCategoriesArray] = useState([])

  useEffect(() => {
    if (categories) {
      const categoriesSet = new Set()

      categories.products.map((product) => {
        categoriesSet.add(product.category)
      })

      const categoriesArrayItem = Array.from(categoriesSet)

      setCategoriesArray(categoriesArrayItem)
    }
  }, [categories])

  return (
    <div className={styles.homepage_wrapper}>
      {categoriesArray.map((category) => {
        return <Category category={category} />
      })}
    </div>
  )
}

export async function getServerSideProps() {
  const categoriesDate = await axios.get(
    "https:dummyjson.com/products?limit=100"
  )
  const categoriesResponse = await categoriesDate.data

  return {
    props: {
      categories: categoriesResponse,
    },
  }
}
