import React from "react"
import styles from "../../styles/notification.module.css"

export default function Notification({
  isPositive,
  notification,
  notificationIndex,
  notifications,
  setNotifications,
}) {
  function handleRemoveNotification() {
    const currentNotifications = [...notifications]
    currentNotifications.splice(notificationIndex, 1)

    console.log("updated", currentNotifications)
    setNotifications(currentNotifications)
  }

  return (
    <div
      onClick={handleRemoveNotification}
      className={
        isPositive
          ? styles.notification_wrapper_positive
          : styles.notification_wrapper_negative
      }
    >
      <div className={styles.close_button}>X</div>
      <div className={styles.notification}>{notification}</div>
    </div>
  )
}
