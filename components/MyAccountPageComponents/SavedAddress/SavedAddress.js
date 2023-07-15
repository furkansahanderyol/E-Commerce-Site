import React from "react"
import { AiFillEdit } from "react-icons/ai"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"
import styles from "../../../styles/myAccountPageStyles/savedAddress.module.css"

export default function SavedAddress(props) {
  const {
    location,
    id,
    name,
    surname,
    street,
    addressName,
    address,
    province,
    country,
    setCreateAddressForm,
    setEditAddressForm,
    setEditAddress,
    setSelectedAddressId,
    setAddresses,
    selectedAddress,
    setSelectedAddress,
    items,
    totalPrice,
  } = props

  async function handleEditAddress() {
    setCreateAddressForm(true)
    setEditAddressForm(true)
    setSelectedAddressId(id)
    axios
      .get(`http://localhost:3000/api/addressInformation/${id}`)
      .then((response) => {
        setEditAddress(response.data.selectedAddress)
      })
  }

  async function handleRemoveAddress() {
    axios.delete(`http://localhost:3000/api/addressInformation/${id}`)

    axios
      .get("http://localhost:3000/api/addressInformation")
      .then((response) => {
        setAddresses(response.data)
      })
  }

  function handleAddressClick() {
    const currentDate = new Date()

    const time = {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
    }

    setSelectedAddress({
      id,
      addressName,
      name,
      surname,
      street,
      province,
      country,
      items,
      day: time.day,
      month: time.month,
      year: time.year,
      hour: time.hour,
      minute: time.minute,
      totalPrice,
    })
  }

  return (
    <div
      onClick={location === "cart" ? handleAddressClick : null}
      className={
        location === "cart"
          ? selectedAddress?.id === id
            ? styles.saved_address_wrapper_cart_selected
            : styles.saved_address_wrapper_cart
          : styles.saved_address_wrapper
      }
    >
      {location === "addressInformation" ? (
        <div className={styles.address_options}>
          <div onClick={handleEditAddress} className={styles.edit_address}>
            <AiFillEdit />
          </div>
          <div onClick={handleRemoveAddress} className={styles.remove_address}>
            <FaTrashAlt />
          </div>
        </div>
      ) : null}
      <div className={styles.address_header}>
        <div className={styles.address_name}>{addressName}</div>
      </div>
      <div className={styles.user_name_and_surname}>{`${name} ${surname}`}</div>
      <div className={styles.street}>{street}</div>
      <div className={styles.address}>{address}</div>
      <div className={styles.province}>{province}</div>
      <div className={styles.country}>{country}</div>
    </div>
  )
}
