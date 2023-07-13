import React from "react"
import styles from "../../../styles/myAccountPageStyles/accountInformationInput.module.css"

export default function AccountInformationInput(props) {
  const {
    type,
    value,
    area,
    header,
    setUpdateName,
    setUpdateSurname,
    setUpdateEmail,
    setUpdateCellphoneNumber,
  } = props

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
      case "cellphone":
        setUpdateCellphoneNumber(e.target.value)
        break
    }
  }

  return (
    <div className={styles.input_container}>
      {area === "cellphone" ? null : (
        <div className={styles.header}>{header}</div>
      )}
      <input
        className={
          area === "email"
            ? styles.account_information_input_email
            : styles.account_information_input
        }
        onChange={handleInputChange}
        type={type}
        defaultValue={value}
      />
    </div>
  )
}
