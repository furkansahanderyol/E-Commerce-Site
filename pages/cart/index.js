import React, { useState, useEffect } from "react"
import CartItem from "@/components/CartItem/CartItem"
import axios from "axios"
import styles from "../../styles/cart.module.css"

export default function Cart({ cart = [] }) {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    setCartItems(cart)
  }, [])

  useEffect(() => {
    console.log("cartItems", cartItems)
  }, [cartItems])

  return (
    <div className={styles.cart_wrapper}>
      <div className={styles.added_items}>
        {cartItems?.map((item) => {
          return (
            <CartItem
              product={item?.items[0]}
              productImage={item?.items[0].thumbnail}
              productName={item?.items[0].title}
              productPrice={item?.items[0].price}
              productQuantity={item?.items.length}
              setCartItems={setCartItems}
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const cart = await fetch("http://localhost:3000/api/cart")
  const data = await cart.json()

  return {
    props: {
      cart: data.cart,
    },
  }
}
