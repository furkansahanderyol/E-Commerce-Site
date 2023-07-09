import React, { useState } from "react"

export const AddressFormContext = React.createContext()

export default function AddressFormProvider({ children }) {
  const [createAddressForm, setCreateAddressForm] = useState(false)
  const [editAddress, setEditAddress] = useState(null)
  const [editAddressForm, setEditAddressForm] = useState(false)
  const [addresses, setAddresses] = useState()

  return (
    <AddressFormContext.Provider
      value={{
        createAddressForm,
        setCreateAddressForm,
        editAddress,
        setEditAddress,
        editAddressForm,
        setEditAddressForm,
        addresses,
        setAddresses,
      }}
    >
      <>
        <div>{children}</div>
      </>
    </AddressFormContext.Provider>
  )
}
