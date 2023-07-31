import React from "react"
import Link from "next/link"
import styles from "../../../styles/myAccountPageStyles/myAccountPageHeader.module.css"

export default function MyAccountPageHeader({ section }) {
  return (
    <div className={styles.my_account_headers}>
      <div
        className={
          section === "myAccount"
            ? styles.section_header_active
            : styles.section_header
        }
      >
        <Link href="/myAccount">MY ACCOUNT</Link>
      </div>
      <div
        className={
          section === "addressInformation"
            ? styles.section_header_active
            : styles.section_header
        }
      >
        <Link href="/myAccount/addressInformation">ADDRESSES</Link>
      </div>
      <div
        className={
          section === "orders"
            ? styles.section_header_active
            : styles.section_header
        }
      >
        <Link href="/myAccount/orders">ORDERS</Link>
      </div>
    </div>
  )
}
