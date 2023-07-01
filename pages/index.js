import React from "react"
import Link from "next/link"
import styles from "../styles/homePageStyles/home.module.css"

export default function index() {
  return (
    <div>
      <Link href={"/category/smartphones"}>
        <div>smartphones</div>
      </Link>
      <Link href={"/category/laptops"}>
        <div>laptops</div>
      </Link>
      <Link href={"/category/skincare"}>
        <div>skincare</div>
      </Link>
      <Link href={"/category/groceries"}>
        <div>groceries</div>
      </Link>
    </div>
  )
}
