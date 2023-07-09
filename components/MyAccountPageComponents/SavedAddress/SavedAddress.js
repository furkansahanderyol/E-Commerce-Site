import React from "react"
import { AiFillEdit } from "react-icons/ai"
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

  return (
    <div className={styles.saved_address_wrapper}>
      {location === "addressInformation" ? (
        <div onClick={handleEditAddress} className={styles.edit_address}>
          <AiFillEdit />
        </div>
      ) : null}
      <div>{name}</div>
      <div>{surname}</div>
      <div>{street}</div>
      <div>{addressName}</div>
      <div>{address}</div>
      <div>{province}</div>
      <div>{country}</div>
    </div>
  )
}
