import React, { useState } from "react"
import MyAccountPageHeader from "@/components/MyAccountPageComponents/MyAccountpAgeHeader/MyAccountPageHeader"
import SavedAddress from "@/components/MyAccountPageComponents/SavedAddress/SavedAddress"
import CreateAddressForm from "@/components/MyAccountPageComponents/CreateAddressForm/CreateAddressForm"
import axios from "axios"
import styles from "../../../styles/myAccountPageStyles/addressInformation.module.css"

export default function AddressInformation({
  addressData,
  countryData,
  API_KEY,
}) {
  const [createAddressForm, setCreateAddressForm] = useState(false)

  function handleCreateAddressButtonClick() {
    setCreateAddressForm(true)
  }

  return (
    <>
      <div className={styles.address_information_wrapper}>
        <div className={styles.section_container}>
          <MyAccountPageHeader section={"addressInformation"} />
          <div className={styles.grid_wrapper}>
            <div className={styles.saved_address_grid}>
              {addressData.addressInformation.map((address) => {
                return (
                  <SavedAddress
                    key={address.id}
                    name={address.name}
                    street={address.street}
                    city={address.city}
                    country={address.country}
                  />
                )
              })}
            </div>
            <button
              className={styles.create_address_button}
              onClick={handleCreateAddressButtonClick}
            >
              Create Address
            </button>
          </div>
        </div>
      </div>
      {createAddressForm ? (
        <CreateAddressForm
          countryData={countryData}
          API_KEY={API_KEY}
          setCreateAddressForm={setCreateAddressForm}
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
