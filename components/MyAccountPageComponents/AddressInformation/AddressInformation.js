import React from "react"
import styles from "../../../styles/myAccountPageStyles/addressInformation.module.css"

export default function AddressInformation() {
  return (
    <>
      <div className={styles.address_information_wrapper}>
        <button>Create Address</button>
      </div>
      <div className={styles.create_address_form}></div>
    </>
  )
}
