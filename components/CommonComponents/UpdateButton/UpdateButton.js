import React from "react"
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

  return (
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
