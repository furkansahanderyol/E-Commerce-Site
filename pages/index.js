import React from "react"
import Link from "next/link"

export default function index() {
  return (
    <div>
      <Link href={"/smartphones"}>
        <div>smartphones</div>
      </Link>
      <Link href={"/laptops"}>
        <div>laptops</div>
      </Link>
      <Link href={"/skincare"}>
        <div>skincare</div>
      </Link>
      <Link href={"/groceries"}>
        <div>groceries</div>
      </Link>
    </div>
  )
}
