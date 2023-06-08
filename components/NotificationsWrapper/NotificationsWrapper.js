import React from "react"
import Notification from "../Notification/Notification"
import styles from "../../styles/notificationsWrapper.module.css"

export default function NotificationsWrapper({
  notifications,
  setNotifications,
}) {
  return (
    <div className={styles.notifications}>
      {notifications.length > 0
        ? notifications.map((notification, index) => {
            return (
              <Notification
                key={index}
                isPositive={notification}
                notification={
                  notification
                    ? "Item added to favorites"
                    : "Item removed from favorites"
                }
                notificationIndex={index}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )
          })
        : null}
    </div>
  )
}
