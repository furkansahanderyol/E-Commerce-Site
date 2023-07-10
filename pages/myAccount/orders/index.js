import React from "react"
import axios from "axios"

export default function Orders({ orders }) {
  return (
    <div>
      {orders.map((order) => {
        return <div>{order.addressName}</div>
      })}
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
