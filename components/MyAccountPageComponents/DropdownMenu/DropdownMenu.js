import React, { useState, useEffect } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { MdKeyboardArrowUp } from "react-icons/md"
import axios from "axios"
import styles from "../../../styles/myAccountPageStyles/dropdownMenu.module.css"

export default function DropdownMenu(props) {
  const {
    type,
    value,
    options,
    setUpdateDialCode,
    setSelectedCountryName,
    setSelectedCountryCode,
    setSelectedProvince,
    danger,
  } = props
  const [dropdown, setDropdown] = useState(false)

  function handleDropdownClick() {
    setDropdown(!dropdown)
  }

  async function selectDialCode(e) {
    const selectedDialCode = e.target.textContent

    axios.post("http://localhost:3000/api/accountInformation/dialCode", {
      selectedDialCode,
    })

    setUpdateDialCode(selectedDialCode)
  }

  function handleCountryNameClick(e) {
    const countryName = e.target.textContent
    const selectedCountryInformation = options.filter((countryInfo) => {
      return countryInfo.countryName === countryName
    })

    setSelectedCountryName(countryName)
    setSelectedCountryCode(selectedCountryInformation[0].countryCode)
  }

  function handleProvinceNameClick(e) {
    const provinceName = e.target.textContent

    setSelectedProvince(provinceName)
  }

  if (type === "dial") {
    return (
      <div
        onClick={handleDropdownClick}
        className={styles.dropdown_menu_wrapper}
      >
        {value}
        <MdKeyboardArrowUp />
        <div
          className={
            dropdown
              ? `${styles.dropdown_menu_list} ${styles.dropdown_menu_list_active}`
              : styles.dropdown_menu_list
          }
        >
          {options.map((option, index) => {
            return (
              <div
                key={index}
                onClick={selectDialCode}
                className={styles.option}
              >
                {option.dial_code}
              </div>
            )
          })}
        </div>
      </div>
    )
  } else if (type === "countryName") {
    return (
      <div
        onClick={handleDropdownClick}
        className={
          danger
            ? styles.dropdown_menu_wrapper_danger
            : styles.dropdown_menu_wrapper
        }
      >
        {value}
        <MdKeyboardArrowUp />
        <div
          className={
            dropdown
              ? ` ${styles.dropdown_menu_list} ${styles.dropdown_menu_list_active}`
              : styles.dropdown_menu_list
          }
        >
          {options.map((option, index) => {
            return (
              <div
                key={index}
                onClick={handleCountryNameClick}
                className={styles.option}
              >
                {option.countryName}
              </div>
            )
          })}
        </div>
      </div>
    )
  } else if (type === "provinceName") {
    return (
      <div
        onClick={handleDropdownClick}
        className={
          options.length > 0
            ? `${
                danger
                  ? styles.dropdown_menu_wrapper_danger
                  : styles.dropdown_menu_wrapper
              } ${styles.dropdown_menu_wrapper_province}`
            : styles.dropdown_menu_wrapper_disabled
        }
      >
        {value}
        <MdKeyboardArrowUp />
        <div
          className={
            dropdown
              ? `${styles.dropdown_menu_list} ${styles.dropdown_menu_list_active}`
              : styles.dropdown_menu_list
          }
        >
          {options.map((option, index) => {
            return (
              <div
                key={index}
                onClick={handleProvinceNameClick}
                className={styles.option}
              >
                {option.toponymName}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
