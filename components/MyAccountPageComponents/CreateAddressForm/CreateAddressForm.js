import React, { useState, useEffect } from "react"
import DropdownMenu from "../DropdownMenu/DropdownMenu"
import { AiOutlineClose } from "react-icons/ai"
import axios from "axios"
import { useRouter } from "next/router"
import styles from "../../../styles/myAccountPageStyles/createAddressForm.module.css"

export default function CreateAddressForm({
  countryData,
  API_KEY,
  setCreateAddressForm,
}) {
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
  const [isNameInputEmpty, setIsNameInputEmpty] = useState(null)
  const [isSurnameInputEmpty, setIsSurnameInputEmpty] = useState(null)
  const [isStreetInputEmpty, setIsStreetInputEmpty] = useState(null)
  const [isAddressNameInputEmpty, setIsAddressNameInputEmpty] = useState(null)
  const [isAddressInputEmpty, setIsAddressInputEmpty] = useState(null)
  const [isSelectedCountryNameEmpty, setIsSelectedCountryNameEmpty] =
    useState(null)
  const [isSelectedProvinceEmpty, setIsSelectedProvinceEmpty] = useState(null)
  const [isFormReady, setIsFormReady] = useState(false)
  const [error, setError] = useState(false)

  const router = useRouter()

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
    if (selectedCountryCode) setSelectedProvince("")
  }, [selectedCountryName])

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
  ])

  useEffect(() => {
    setIsNameInputEmpty(null)
    setIsSurnameInputEmpty(null)
    setIsStreetInputEmpty(null)
    setIsAddressNameInputEmpty(null)
    setIsAddressInputEmpty(null)
    setIsSelectedCountryNameEmpty(null)
    setIsSelectedProvinceEmpty(null)
  }, [])

  useEffect(() => {
    if (!isFormReady) return

    const newAddress = {
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
      axios.post("http://localhost:3000/api/addressInformation", {
        newAddress,
      })
    } catch (error) {
      console.log(error)
    }

    setIsFormReady(false)
    setCreateAddressForm(false)
    router.reload()
  }, [isFormReady])

  function handleCloseForm() {
    setCreateAddressForm(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (
      isNameInputEmpty === false &&
      isSurnameInputEmpty === false &&
      isStreetInputEmpty === false &&
      isAddressNameInputEmpty === false &&
      isAddressInputEmpty === false &&
      isSelectedCountryNameEmpty === false &&
      isSelectedProvinceEmpty === false
    ) {
      setError(false)
      setIsFormReady(true)
    } else {
      setError(true)
    }
  }

  return (
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
            onChange={(e) => setNameInput(e.target.value)}
            type="text"
            id="name"
            name="name"
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
            onChange={(e) => setSurnameInput(e.target.value)}
            type="text"
            id="surname"
            name="surname"
          />
        </div>
      </div>
      <div className={styles.country_and_province_container}>
        <div>
          <div>Country: </div>
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
          <div>Province: </div>
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
            onChange={(e) => setAddressInput(e.target.value)}
            id="address"
            name="address"
          />
        </div>
      </div>
      {error ? <div>Please fill in the marked fields</div> : null}
      <div className={styles.create_new_address_button}>
        <button type="submit">Create new address</button>
      </div>
    </form>
  )
}
