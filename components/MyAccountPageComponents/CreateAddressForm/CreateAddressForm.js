import React, { useState, useEffect, useRef } from "react"
import DropdownMenu from "../DropdownMenu/DropdownMenu"
import { AiOutlineClose } from "react-icons/ai"
import axios from "axios"
import { v4 } from "uuid"
import Overlay from "@/components/CommonComponents/Overlay/Overlay"
import styles from "../../../styles/myAccountPageStyles/createAddressForm.module.css"
import CustomButton from "@/components/CommonComponents/CustomButton/CustomButton"

export default function CreateAddressForm(props) {
  const {
    countryData,
    API_KEY,
    setCreateAddressForm,
    editAddressForm,
    setEditAddressForm,
    editAddress,
    selectedAddressId,
    setAddresses,
  } = props

  const [countries, setCountries] = useState()
  const [selectedCountryName, setSelectedCountryName] = useState("")
  const [selectedCountryCode, setSelectedCountryCode] = useState("")
  const [provinces, setProvinces] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [surnameInput, setSurnameInput] = useState("")
  const [streetInput, setStreetInput] = useState("")
  const [addressNameInput, setAddressNameInput] = useState("")
  const [addressInput, setAddressInput] = useState("")
  const [isNameInputEmpty, setIsNameInputEmpty] = useState(false)
  const [isSurnameInputEmpty, setIsSurnameInputEmpty] = useState(false)
  const [isStreetInputEmpty, setIsStreetInputEmpty] = useState(false)
  const [isAddressNameInputEmpty, setIsAddressNameInputEmpty] = useState(false)
  const [isAddressInputEmpty, setIsAddressInputEmpty] = useState(false)
  const [isSelectedCountryNameEmpty, setIsSelectedCountryNameEmpty] =
    useState(false)
  const [isSelectedProvinceEmpty, setIsSelectedProvinceEmpty] = useState(false)
  const [isFormReady, setIsFormReady] = useState(false)
  const [error, setError] = useState(false)
  const nameInputRef = useRef(null)
  const surnameInputRef = useRef(null)
  const streetInputRef = useRef(null)
  const addressNameInputRef = useRef(null)
  const addressInputRef = useRef(null)

  useEffect(() => {
    if (editAddressForm) {
      !nameInput ? setNameInput(editAddress?.[0].name || "") : null
      !surnameInput ? setSurnameInput(editAddress?.[0].surname || "") : null
      !streetInput ? setStreetInput(editAddress?.[0].street || "") : null
      !addressNameInput
        ? setAddressNameInput(editAddress?.[0].addressName || "")
        : null
      !addressInput ? setAddressInput(editAddress?.[0].address || "") : null

      nameInputRef.current.value = editAddress?.[0].name
      surnameInputRef.current.value = editAddress?.[0].surname
      streetInputRef.current.value = editAddress?.[0].street
      addressNameInputRef.current.value = editAddress?.[0].addressName
      addressInputRef.current.value = editAddress?.[0].address

      setSelectedCountryCode(editAddress?.[0].countryCode)
      setSelectedCountryName(editAddress?.[0].country)
      setSelectedProvince(editAddress?.[0].province)
    }
  }, [editAddress])

  useEffect(() => {
    const countryNames = countryData?.countryInformation.geonames.map(
      (country) => {
        return {
          countryName: country.countryName,
          countryCode: country.countryCode,
        }
      }
    )

    setCountries(countryNames)
  }, [])

  useEffect(() => {
    if (selectedCountryCode) {
      const countryCode = selectedCountryCode.toLowerCase()

      axios
        .get(
          `http://api.geonames.org/searchJSON?country=${countryCode}&featureCode=ADM1&username=${API_KEY}`
        )
        .then((response) => {
          return setProvinces(response.data)
        })
    }
  }, [selectedCountryCode])

  useEffect(() => {
    if (error) {
      nameInput === "" ? setIsNameInputEmpty(true) : setIsNameInputEmpty(false)
      surnameInput === ""
        ? setIsSurnameInputEmpty(true)
        : setIsSurnameInputEmpty(false)
      streetInput === ""
        ? setIsStreetInputEmpty(true)
        : setIsStreetInputEmpty(false)
      addressNameInput === ""
        ? setIsAddressNameInputEmpty(true)
        : setIsAddressNameInputEmpty(false)
      addressInput === ""
        ? setIsAddressInputEmpty(true)
        : setIsAddressInputEmpty(false)
      selectedCountryName === ""
        ? setIsSelectedCountryNameEmpty(true)
        : setIsSelectedCountryNameEmpty(false)
      selectedProvince === ""
        ? setIsSelectedProvinceEmpty(true)
        : setIsSelectedProvinceEmpty(false)
    }
  }, [
    nameInput,
    surnameInput,
    streetInput,
    addressNameInput,
    addressInput,
    selectedCountryName,
    selectedProvince,
    error,
    isFormReady,
  ])

  useEffect(() => {
    if (!isFormReady) return

    const newAddress = {
      id: editAddressForm ? selectedAddressId : v4(),
      name: nameInput,
      surname: surnameInput,
      street: streetInput,
      addressName: addressNameInput,
      address: addressInput,
      province: selectedProvince,
      country: selectedCountryName,
      countryCode: selectedCountryCode,
    }

    try {
      editAddressForm
        ? axios.post("http://localhost:3000/api/addressInformation/update", {
            newAddress,
          })
        : axios.post("http://localhost:3000/api/addressInformation", {
            newAddress,
          })
    } catch (error) {
      console.log(error)
    }

    setIsFormReady(false)
    setCreateAddressForm(false)
    setEditAddressForm(false)

    try {
      axios
        .get("http://localhost:3000/api/addressInformation")
        .then((response) => {
          setAddresses(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }, [isFormReady])

  useEffect(() => {
    console.log("selectedAddressId", selectedAddressId)
  }, [selectedAddressId])

  useEffect(() => {
    console.log("editAddressForm", editAddressForm)
  }, [editAddressForm])

  function handleCloseForm() {
    setCreateAddressForm(false)
    setEditAddressForm(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (
      nameInput === "" ||
      surnameInput === "" ||
      streetInput === "" ||
      addressNameInput === "" ||
      addressInput === "" ||
      selectedCountryName === "" ||
      selectedProvince === ""
    ) {
      setError(true)
    } else {
      setError(false)
      setIsFormReady(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.create_address_form}>
        <div className={styles.form_header}>
          <div className={styles.header}>Create new address</div>
          <AiOutlineClose onClick={handleCloseForm} />
        </div>
        <div className={styles.name_and_surname_container}>
          <div
            className={
              isNameInputEmpty
                ? styles.input_wrapper_danger
                : styles.input_wrapper
            }
          >
            <label htmlFor="name">Name:</label>
            <input
              ref={nameInputRef}
              onChange={(e) => setNameInput(e.target.value)}
              type="text"
              id="name"
              name="name"
              value={nameInput}
            />
          </div>
          <div
            className={
              isSurnameInputEmpty
                ? styles.input_wrapper_danger
                : styles.input_wrapper
            }
          >
            <label htmlFor="surname">Surname:</label>
            <input
              ref={surnameInputRef}
              onChange={(e) => setSurnameInput(e.target.value)}
              type="text"
              id="surname"
              name="surname"
            />
          </div>
        </div>
        <div className={styles.country_and_province_container}>
          <div>
            <div className={styles.dropdown_menu_header}>Country: </div>
            <DropdownMenu
              type={"countryName"}
              value={selectedCountryName}
              options={countries ? countries : []}
              setSelectedCountryName={setSelectedCountryName}
              setSelectedCountryCode={setSelectedCountryCode}
              danger={isSelectedCountryNameEmpty}
            />
          </div>
          <div>
            <div className={styles.dropdown_menu_header}>Province: </div>
            <DropdownMenu
              type={"provinceName"}
              options={provinces ? provinces.geonames : []}
              value={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              danger={isSelectedProvinceEmpty}
            />
          </div>
        </div>
        <div className={styles.street_container}>
          <div
            className={
              isStreetInputEmpty
                ? styles.input_wrapper_danger
                : styles.input_wrapper
            }
          >
            <label htmlFor="street">Street:</label>
            <input
              ref={streetInputRef}
              onChange={(e) => setStreetInput(e.target.value)}
              type="text"
              id="street"
              name="street"
            />
          </div>
        </div>
        <div className={styles.address_container}>
          <div
            className={
              isAddressNameInputEmpty
                ? styles.input_wrapper_danger
                : styles.input_wrapper
            }
          >
            <label htmlFor="addressName">Address name:</label>
            <input
              ref={addressNameInputRef}
              onChange={(e) => setAddressNameInput(e.target.value)}
              type="text"
              id="addressName"
              name="addressName"
            />
          </div>
          <div
            className={
              isAddressInputEmpty
                ? `${styles.input_wrapper_danger} ${styles.address_input_danger}`
                : `${styles.input_wrapper} ${styles.address_input}`
            }
          >
            <label htmlFor="address">Address:</label>
            <textarea
              ref={addressInputRef}
              onChange={(e) => setAddressInput(e.target.value)}
              id="address"
              name="address"
            />
          </div>
        </div>
        {error ? <div>Please fill in the marked fields</div> : null}
        <div className={styles.create_new_address_button}>
          {editAddressForm ? (
            <CustomButton location={"addressForm"} value={"Update address"} />
          ) : (
            <CustomButton
              location={"addressForm"}
              value={"Create new address"}
            />
          )}
        </div>
      </form>
      <Overlay />
    </>
  )
}
