import React from "react"
import { useRouter } from "next/router"
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
  } = props

  const router = useRouter()

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
    router.reload()
  }

  return (
    <div className={styles.saved_address_wrapper}>
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
