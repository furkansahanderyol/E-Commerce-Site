import React, { useState, useEffect, useContext } from "react"
import MyAccountPageHeader from "@/components/MyAccountPageComponents/MyAccountPageHeader/MyAccountPageHeader"
import SavedAddress from "@/components/MyAccountPageComponents/SavedAddress/SavedAddress"
import CreateAddressForm from "@/components/MyAccountPageComponents/CreateAddressForm/CreateAddressForm"
import axios from "axios"
import { AddressFormContext } from "@/components/CommonComponents/AddressFormContext/AddressFormContext"
import UpdateButton from "@/components/CommonComponents/UpdateButton/UpdateButton"
import styles from "../../../styles/myAccountPageStyles/addressInformation.module.css"

export default function AddressInformation({
  addressData,
  countryData,
  API_KEY,
}) {
  const {
    createAddressForm,
    setCreateAddressForm,
    editAddress,
    setEditAddress,
    editAddressForm,
    setEditAddressForm,
    addresses,
    setAddresses,
  } = useContext(AddressFormContext)

  const [selectedAddressId, setSelectedAddressId] = useState(null)

  useEffect(() => {
    if (!addresses) {
      setAddresses(addressData)
    }
  }, [])

  useEffect(() => {
    console.log("selectedAddressId", selectedAddressId)
  }, [selectedAddressId])

  return (
    <>
      <div className={styles.address_information_wrapper}>
        <div className={styles.section_container}>
          <MyAccountPageHeader section={"addressInformation"} />
          <div className={styles.grid_wrapper}>
            <div className={styles.saved_address_grid}>
              {addresses?.addressInformation?.map((address) => {
                return (
                  <SavedAddress
                    location={"addressInformation"}
                    key={address.id}
                    id={address.id}
                    name={address.name}
                    surname={address.surname}
                    street={address.street}
                    addressName={address.addressName}
                    address={address.address}
                    province={address.city}
                    country={address.country}
                    setCreateAddressForm={setCreateAddressForm}
                    setEditAddressForm={setEditAddressForm}
                    setEditAddress={setEditAddress}
                    setSelectedAddressId={setSelectedAddressId}
                    setAddresses={setAddresses}
                  />
                )
              })}
            </div>
            <UpdateButton
              location={"addressInformation"}
              createAddressForm={createAddressForm}
              setCreateAddressForm={setCreateAddressForm}
            />
          </div>
        </div>
      </div>
      {createAddressForm ? (
        <CreateAddressForm
          countryData={countryData}
          API_KEY={API_KEY}
          setCreateAddressForm={setCreateAddressForm}
          editAddressForm={editAddressForm}
          setEditAddressForm={setEditAddressForm}
          editAddress={editAddress}
          selectedAddressId={selectedAddressId}
          setAddresses={setAddresses}
        />
      ) : null}
    </>
  )
}

export async function getServerSideProps() {
  const addressResponse = await axios.get(
    "http://localhost:3000/api/addressInformation"
  )
  const countryInformationResponse = await axios.get(
    "http://localhost:3000/api/countryInformation"
  )

  const addressData = await addressResponse.data
  const countryData = await countryInformationResponse.data
  const API_KEY = "plac1dusax"

  return {
    props: {
      addressData,
      countryData,
      API_KEY,
    },
  }
}
