import React, { useEffect } from "react"
import CartItem from "@/components/CartItem/CartItem"
import axios from "axios"
import styles from "../../styles/cart.module.css"

export default function Cart({ cart = [] }) {
  useEffect(() => {
    console.log("cart", cart)
  }, [cart])

  return (
    <div className={styles.cart_wrapper}>
      <div className={styles.added_items}></div>
    </div>
  )
}

export async function getServerSideProps() {
  const cart = await fetch("http://localhost:3000/api/cart")
  const data = await cart.json()

  return {
    props: {
      cart: data,
    },
  }
}
