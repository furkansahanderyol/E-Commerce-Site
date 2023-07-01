import React, { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { MdKeyboardArrowUp } from "react-icons/md"
import axios from "axios"
import styles from "../../../styles/myAccountPageStyles/dropdownMenu.module.css"

export default function DropdownMenu({ value, options, setUpdateDialCode }) {
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

  return (
    <div onClick={handleDropdownClick} className={styles.dropdown_menu_wrapper}>
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
            <div key={index} onClick={selectDialCode} className={styles.option}>
              {option.dial_code}
            </div>
          )
        })}
      </div>
    </div>
  )
}
