import React from "react"
import { FaPlus } from "react-icons/fa"
import styles from "../../../styles/cartPageStyles/createAddressButton.module.css"

export default function CreateAddressButton({ setCreateAddressForm }) {
  function handleCreateAddressButton() {
    setCreateAddressForm(true)
  }

  return (
    <div
      onClick={handleCreateAddressButton}
      className={styles.create_address_button_wrapper}
    >
      <div className={styles.plus}>
        <FaPlus />
      </div>
      <div className={styles.create_new_address}>Create new address</div>
    </div>
  )
}
