import React from "react"
import Image from "next/image"
import { FaCheck } from "react-icons/fa"
import styles from "../../../styles/myAccountPageStyles/orderStatus.module.css"

export default function OrderStatus({ thumbnail, status }) {
  return (
    <div className={styles.order_details}>
      <div className={styles.order_status}>
        <FaCheck />
        <div>Your order has reached us</div>
      </div>
      <div className={styles.product_thumbnail}>
        <Image src={thumbnail} layout="fill" alt="Product image" />
      </div>
    </div>
  )
}
