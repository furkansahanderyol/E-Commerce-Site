import React, { useState, useEffect } from "react"
import DropdownMenu from "../DropdownMenu/DropdownMenu"
import axios from "axios"
import styles from "../../../styles/myAccountPageStyles/createAddressForm.module.css"

export default function CreateAddressForm({ countryData, API_KEY }) {
  const [countries, setCountries] = useState()
  const [selectedCountryName, setSelectedCountryName] = useState("")
  const [selectedCountryCode, setSelectedCountryCode] = useState("")
  const [provinces, setProvinces] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("")

  useEffect(() => {
    const countryNames = countryData?.geonames.map((country) => {
      return {
        countryName: country.countryName,
        countryCode: country.countryCode,
      }
    })

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
    if (provinces) {
      console.log("provinces", provinces)
    }
  }, [provinces])

  return (
    <form className={styles.create_address_form}>
      <label htmlFor="addressName">Address name:</label>
      <input type="text" id="addressName" name="addressName" />
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="surname">Surname:</label>
      <input type="text" id="surname" name="surname" />
      <div>
        <div>Country:</div>
        <DropdownMenu
          type={"countryName"}
          value={selectedCountryName}
          options={countries ? countries : []}
          setSelectedCountryName={setSelectedCountryName}
          setSelectedCountryCode={setSelectedCountryCode}
        />
      </div>
      <div>
        <div>City</div>
        <DropdownMenu
          type={"provinceName"}
          options={provinces ? provinces : []}
          value={selectedProvince}
          setSelectedProvince={setSelectedProvince}
        />
      </div>
    </form>
  )
}
