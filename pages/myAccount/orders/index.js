import React from "react"
import axios from "axios"
import MyAccountPageHeader from "@/components/MyAccountPageComponents/MyAccountPageHeader/MyAccountPageHeader"
import Order from "@/components/MyAccountPageComponents/Order/Order"
import { FaShoppingCart } from "react-icons/fa"
import styles from "../../../styles/myAccountPageStyles/orders.module.css"

export default function Orders({ orders }) {
  return (
    <div className={styles.orders_wrapper}>
      <div className={styles.section_container}>
        <MyAccountPageHeader section={"orders"} />
        <div className={styles.orders}>
          {orders.length > 0 ? (
            orders.map((order) => {
              return (
                <Order
                  key={order.id}
                  day={order.day}
                  month={order.month}
                  year={order.year}
                  hour={order.hour}
                  minute={order.minute}
                  items={order.items}
                  name={order.name}
                  surname={order.surname}
                  totalPrice={order.totalPrice}
                />
              )
            })
          ) : (
            <div className={styles.empty_orders}>
              <FaShoppingCart />
              You do not have any orders.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const ordersResponse = await axios.get("http://localhost:3000/api/orders")
  const orderData = await ordersResponse.data

  return {
    props: {
      orders: orderData.orders,
    },
  }
}
