import React from "react"
import styles from "../../../styles/myAccountPageStyles/accountInformationInput.module.css"

export default function AccountInformationInput(props) {
  const { type, value, area, setUpdateName, setUpdateSurname, setUpdateEmail } =
    props

  function handleInputChange(e) {
    switch (area) {
      case "name":
        setUpdateName(e.target.value)
        break
      case "surname":
        setUpdateSurname(e.target.value)
        break
      case "email":
        setUpdateEmail(e.target.value)
        break
    }
  }

  return <input onChange={handleInputChange} type={type} defaultValue={value} />
}
