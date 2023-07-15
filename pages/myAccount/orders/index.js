import React from "react"
import axios from "axios"
import MyAccountPageHeader from "@/components/MyAccountPageComponents/MyAccountPageHeader/MyAccountPageHeader"
import Order from "@/components/MyAccountPageComponents/Order/Order"
import styles from "../../../styles/myAccountPageStyles/orders.module.css"

export default function Orders({ orders }) {
  console.log(orders)

  return (
    <div className={styles.orders_wrapper}>
      <div className={styles.section_container}>
        <MyAccountPageHeader section={"orders"} />
        <div className={styles.orders}>
          {orders.map((order) => {
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
          })}
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
