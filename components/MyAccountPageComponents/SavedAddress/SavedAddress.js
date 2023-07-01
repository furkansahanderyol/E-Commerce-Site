import React from "react"
import styles from "../../../styles/myAccountPageStyles/savedAddress.module.css"

export default function SavedAddress({ id, name, street, city, country }) {
  return (
    <div className={styles.saved_address_wrapper}>
      <div>{name}</div>
      <div>{street}</div>
      <div>{city}</div>
      <div>{country}</div>
    </div>
  )
}
