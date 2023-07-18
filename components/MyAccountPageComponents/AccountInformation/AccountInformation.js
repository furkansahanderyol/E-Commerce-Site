import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import AccountInformationInput from "../AccountInformationInput/AccountInformationInput"
import DropdownMenu from "../DropdownMenu/DropdownMenu"
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox"
import axios from "axios"
import styles from "../../../styles/myAccountPageStyles/accountInformation.module.css"
import CustomButton from "@/components/CommonComponents/CustomButton/CustomButton"

export default function AccountInformation({ data, setData }) {
  const [areaCodes, setAreaCodes] = useState([])
  const [name, setName] = useState(data?.name || "")
  const [surname, setSurname] = useState(data?.surname || "")
  const [email, setEmail] = useState(data?.email || "")
  const [dialCode, setDialCode] = useState(data?.dialCode)
  const [cellphoneNumber, setCellphoneNumber] = useState(data?.cellphoneNumber)
  const [gender, setGender] = useState(data?.gender)
  const [updateName, setUpdateName] = useState(data?.name)
  const [updateSurname, setUpdateSurname] = useState(data?.surname)
  const [updateEmail, setUpdateEmail] = useState(data?.email)
  const [updateButtonActive, setUpdateButtonActive] = useState(false)
  const [updateDialCode, setUpdateDialCode] = useState(data?.dialCode)
  const [updateCellphoneNumber, setUpdateCellphoneNumber] = useState(
    data?.cellphoneNumber
  )
  const [updateGender, setUpdateGender] = useState(data?.gender)

  const router = useRouter()

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
      )
      .then((response) => {
        setAreaCodes(response.data)
      })
  }, [])

  useEffect(() => {
    const isNameUpdated = name !== updateName
    const isSurnameUpdated = surname !== updateSurname
    const isEmailUpdated = email !== updateEmail
    const isDialCodeUpdated = dialCode !== updateDialCode
    const isCellphoneNumberUpdated =
      parseInt(cellphoneNumber) !== parseInt(updateCellphoneNumber)
    const isGenderUpdated = gender !== updateGender

    if (
      isNameUpdated ||
      isSurnameUpdated ||
      isEmailUpdated ||
      isDialCodeUpdated ||
      isCellphoneNumberUpdated ||
      isGenderUpdated
    ) {
      setUpdateButtonActive(true)
    } else {
      setUpdateButtonActive(false)
    }
  }, [
    updateName,
    updateSurname,
    updateEmail,
    updateDialCode,
    updateCellphoneNumber,
    updateGender,
  ])

  return (
    <div className={styles.account_information_wrapper}>
      <div className={styles.information_container_columns}>
        <div className={styles.information_container}>
          <AccountInformationInput
            type={"text"}
            area={"name"}
            header={"Name:"}
            value={name}
            setUpdateName={setUpdateName}
          />
          <AccountInformationInput
            type={"text"}
            area={"surname"}
            header={"Surname:"}
            value={surname}
            setUpdateSurname={setUpdateSurname}
          />
        </div>
        <div className={styles.information_container}>
          <AccountInformationInput
            type={"email"}
            area={"email"}
            header={"Email:"}
            value={email}
            setUpdateEmail={setUpdateEmail}
          />
          <div className={styles.cellphone_number}>
            <div className={styles.header}>Cellphone: </div>
            <div className={styles.cellphone_number_inputs}>
              <DropdownMenu
                type={"dial"}
                value={updateDialCode}
                options={areaCodes}
                setUpdateDialCode={setUpdateDialCode}
              />
              <AccountInformationInput
                type={"number"}
                area={"cellphone"}
                value={updateCellphoneNumber}
                setUpdateCellphoneNumber={setUpdateCellphoneNumber}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gender_selection}>
        <div className={styles.header}>Gender:</div>
        <div className={styles.gender_selection_checkboxes}>
          <div className={styles.male}>
            <CustomCheckbox
              gender={"Male"}
              updateGender={updateGender}
              setUpdateGender={setUpdateGender}
            />
          </div>
          <div className={styles.female}>
            <CustomCheckbox
              gender={"Female"}
              updateGender={updateGender}
              setUpdateGender={setUpdateGender}
            />
          </div>
        </div>
      </div>
      <div
        className={
          updateButtonActive
            ? styles.update_button_active
            : styles.update_button
        }
      >
        <CustomButton
          location={"accountInformation"}
          value={"Update"}
          updateButtonActive={updateButtonActive}
          updateName={updateName}
          updateSurname={updateSurname}
          updateEmail={updateEmail}
          updateGender={updateGender}
        />
      </div>
    </div>
  )
}
