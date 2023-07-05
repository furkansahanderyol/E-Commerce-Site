import React from "react"
import { AiFillEdit } from "react-icons/ai"
import styles from "../../../styles/myAccountPageStyles/savedAddress.module.css"

export default function SavedAddress(props) {
  const {
    location,
    id,
    name,
    street,
    city,
    country,
    setCreateAddressForm,
    setSelectedAddressId,
    setSelectedAddressName,
    setSelectedAddressStreet,
    setSelectedAddressProvince,
    setSelectedAddressCountry,
    setEditAddress,
  } = props

  function handleEditAddress() {
    setSelectedAddressId(id)
    setSelectedAddressName(name)
    setSelectedAddressStreet(street)
    setSelectedAddressProvince(city)
    setSelectedAddressCountry(country)
    setCreateAddressForm(true)
    setEditAddress(true)
  }

  return (
    <div className={styles.saved_address_wrapper}>
      {location === "addressInformation" ? (
        <div onClick={handleEditAddress} className={styles.edit_address}>
          <AiFillEdit />
        </div>
      ) : null}
      <div>{name}</div>
      <div>{street}</div>
      <div>{city}</div>
      <div>{country}</div>
    </div>
  )
}
