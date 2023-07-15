import React from "react"
import OrderStatus from "../OrderStatus/OrderStatus"
import styles from "../../../styles/myAccountPageStyles/order.module.css"

export default function Order(props) {
  const { day, hour, year, month, minute, items, name, surname, totalPrice } =
    props

  return (
    <div className={styles.order_wrapper}>
      <div className={styles.order_header}>
        <div className={styles.container}>
          <div className={styles.header}>Order Date</div>
          <div
            className={styles.value}
          >{`${day}.${month}.${year} - ${hour}:${minute}`}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>Number of Products</div>
          <div className={styles.value}>4</div>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>Buyer</div>
          <div className={styles.value}>{`${name} ${surname}`}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>Total Price</div>
          <div className={styles.value}>{`${totalPrice}$`}</div>
        </div>
      </div>
      {items.map((item) => {
        return (
          <OrderStatus thumbnail={item.items[0].thumbnail} status={"reached"} />
        )
      })}
    </div>
  )
}
