import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import AccountInformationInput from "../AccountInformationInput/AccountInformationInput"
import DropdownMenu from "../DropdownMenu/DropdownMenu"
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox"
import axios from "axios"
import styles from "../../styles/accountInformation.module.css"

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
  const maleGenderRef = useRef(null)
  const femaleGenderRef = useRef(null)

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

    if (
      isNameUpdated ||
      isSurnameUpdated ||
      isEmailUpdated ||
      isDialCodeUpdated ||
      isCellphoneNumberUpdated
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
  ])

  async function handleUpdateAccountInformation() {
    axios.post("http://localhost:3000/api/accountInformation/update", {
      updateName,
      updateSurname,
      updateEmail,
    })

    axios
      .get("http://localhost:3000/api/accountInformation")
      .then((response) => {
        setData(response)
      })

    router.reload()
  }

  function handleCellphoneNumber(e) {
    setUpdateCellphoneNumber(e.target.value)
  }

  function handleMaleGenderSelection(e) {
    const checkboxWrapper = maleGenderRef.current
    console.log("x1", checkboxWrapper)
    const checkbox = checkboxWrapper.querySelector("input")
    setUpdateGender("male")

    checkbox.checked = true
  }

  function handleFemaleGenderSelection() {
    const checkboxWrapper = femaleGenderRef.current
    console.log("x2", checkboxWrapper)
    const checkbox = checkboxWrapper.querySelector("input")
    setUpdateGender("female")

    checkbox.checked = true
  }

  return (
    <div className={styles.account_information_wrapper}>
      <div className={styles.name_and_surname_container}>
        <div className={styles.name}>
          <div>Name:</div>
          <AccountInformationInput
            type={"text"}
            area={"name"}
            value={name}
            setUpdateName={setUpdateName}
          />
        </div>
        <div className={styles.surname}>
          <div>Surname:</div>
          <AccountInformationInput
            type={"text"}
            area={"surname"}
            value={surname}
            setUpdateSurname={setUpdateSurname}
          />
        </div>
      </div>
      <div className={styles.email_container}>
        <div className={styles.email}>
          <div>Email:</div>
          <AccountInformationInput
            type={"email"}
            area={"email"}
            value={email}
            setUpdateEmail={setUpdateEmail}
          />
        </div>
      </div>
      <div className={styles.cellphone_number}>
        <div>Cellphone: </div>
        <div>
          <DropdownMenu
            value={updateDialCode}
            options={areaCodes}
            setUpdateDialCode={setUpdateDialCode}
          />
          <div className={styles.cellphone_number_input}>
            <input
              onChange={handleCellphoneNumber}
              type="number"
              defaultValue={updateCellphoneNumber}
            />
          </div>
        </div>
      </div>
      <div className={styles.gender_selection}>
        <div onClick={handleMaleGenderSelection} className={styles.male}>
          <CustomCheckbox gender={"Male"} maleGenderRef={maleGenderRef} />
        </div>
        <div onClick={handleFemaleGenderSelection} className={styles.female}>
          <CustomCheckbox gender={"Female"} femaleGenderRef={femaleGenderRef} />
        </div>
      </div>
      <div
        className={
          updateButtonActive
            ? styles.update_button_active
            : styles.update_button
        }
      >
        <button onClick={handleUpdateAccountInformation} type="submit">
          Update
        </button>
      </div>
    </div>
  )
}
