import React, { useEffect } from "react"
import axios from "axios"
import styles from "../../../styles/commonComponentStyles/updateButton.module.css"

export default function UpdateButton(props) {
  const {
    location,
    updateButtonActive,
    updateName,
    updateSurname,
    updateEmail,
    updateGender,
    createAddressForm,
    setCreateAddressForm,
  } = props

  async function handleUpdateAccountInformation() {
    axios.post("http://localhost:3000/api/accountInformation/update", {
      updateName,
      updateSurname,
      updateEmail,
      updateGender,
    })

    axios
      .get("http://localhost:3000/api/accountInformation")
      .then((response) => {
        setData(response)
      })

    router.reload()
  }

  function handleCreateAddressButtonClick() {
    setCreateAddressForm(true)
  }

  useEffect(() => {}, [createAddressForm])

  return location === "addressInformation" ? (
    <div className={styles.create_address_button}>
      <button onClick={handleCreateAddressButtonClick} type="submit">
        Create address
      </button>
    </div>
  ) : (
    <div
      className={
        updateButtonActive ? styles.update_button_active : styles.update_button
      }
    >
      <button onClick={handleUpdateAccountInformation} type="submit">
        Update
      </button>
    </div>
  )
}
