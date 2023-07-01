import React, { useState } from "react"
import SavedAddress from "../SavedAddress/SavedAddress"
import CreateAddressForm from "../CreateAddressForm/CreateAddressForm"
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
        <div className={styles.addresses}>
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
      {createAddressForm ? (
        <CreateAddressForm countryData={countryData} API_KEY={API_KEY} />
      ) : null}
    </>
  )
}
