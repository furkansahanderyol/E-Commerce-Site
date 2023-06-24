import React, { useState, useEffect } from "react"
import CartItem from "@/components/CartItem/CartItem"
import axios from "axios"
import styles from "../../styles/cart.module.css"

export default function Cart({ cart = [] }) {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setCartItems(cart)
  }, [cart])

  useEffect(() => {
    const calculateTotalPrice = cartItems.reduce((accumulator, value) => {
      return accumulator + value.items[0]?.price * value.items.length
    }, 0)

    setTotalPrice(calculateTotalPrice)
  }, [cartItems])

  return (
    <div className={styles.cart_wrapper}>
      <div className={styles.cart_header}>
        <div className={styles.header}>
          My cart
          <span
            className={styles.total_item}
          >{` (${cartItems.length} items)`}</span>
        </div>
      </div>
      <div className={styles.cart_information}>
        <div className={styles.added_items}>
          {cartItems?.map((item, index) => {
            return (
              <CartItem
                key={index}
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
        <div className={styles.overall_price}>
          <div className={styles.order_summary}>Order summary</div>
          <div className={styles.total_price}>
            Total price: <span>{`${totalPrice}$`}</span>
          </div>
          <div className={styles.complete_the_order_button}>
            <button>Complete the order</button>
          </div>
        </div>
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
