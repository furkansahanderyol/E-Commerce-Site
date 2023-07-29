import React from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "../../../styles/homePageStyles/category.module.css"

export default function Category({ category }) {
  let categoryImage

  switch (category) {
    case "smartphones":
      categoryImage = "/images/smartphone.jpg"
      break
    case "laptops":
      categoryImage = "/images/laptops.jpg"
      break
    case "fragrances":
      categoryImage = "/images/fragrances.jpg"
      break
    case "skincare":
      categoryImage = "/images/skincare.jpg"
      break
    case "groceries":
      categoryImage = "/images/groceries.jpg"
      break
    case "home-decoration":
      categoryImage = "/images/home-decoration.jpg"
      break
    case "furniture":
      categoryImage = "/images/furniture.jpg"
      break
    case "tops":
      categoryImage = "/images/tops.jpg"
      break
    case "womens-dresses":
      categoryImage = "/images/womens-dresses.jpg"
      break
    case "womens-shoes":
      categoryImage = "/images/womens-shoes.jpg"
      break
    case "mens-shirts":
      categoryImage = "/images/men-shirts.jpg"
      break
    case "mens-shoes":
      categoryImage = "/images/men-shoes.jpg"
      break
    case "mens-watches":
      categoryImage = "/images/men-watches.jpg"
      break
    case "womens-watches":
      categoryImage = "/images/women-watches.jpg"
      break
    case "womens-bags":
      categoryImage = "/images/women-bags.jpg"
      break
    case "womens-jewellery":
      categoryImage = "/images/women-jewellery.jpg"
      break
    case "sunglasses":
      categoryImage = "/images/sunglasses.jpg"
      break
    case "automotive":
      categoryImage = "/images/automotive.jpg"
      break
    case "motorcycle":
      categoryImage = "/images/motocycle.jpg"
      break
    case "lighting":
      categoryImage = "/images/lighting.jpg"
      break
  }

  return (
    <Link href={`/category/${category}`}>
      <div className={styles.category_wrapper}>
        <Image
          className={styles.test}
          src={categoryImage}
          alt="Category image"
          objectFit="cover"
          layout="fill"
        />
        <div className={styles.category_name}>{category}</div>
      </div>
    </Link>
  )
}
