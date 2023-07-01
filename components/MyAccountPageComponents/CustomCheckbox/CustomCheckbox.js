import React, { useRef, useEffect } from "react"
import styles from "../../../styles/myAccountPageStyles/customCheckbox.module.css"

export default function CustomCheckbox({
  gender,
  updateGender,
  setUpdateGender,
}) {
  const checkboxRef = useRef(null)

  function handleCheckboxClick() {
    const container = checkboxRef.current
    const label = container.querySelector("label")

    setUpdateGender(label.textContent.toLowerCase())
  }

  useEffect(() => {
    const container = checkboxRef.current
    const checkbox = container.querySelector("input")
    const label = container.querySelector("label")

    updateGender === label.textContent.toLowerCase()
      ? (checkbox.checked = true)
      : (checkbox.checked = false)
  }, [updateGender])

  return (
    <div
      ref={checkboxRef}
      onClick={handleCheckboxClick}
      className={styles.checkbox_wrapper}
    >
      <input className={styles.custom_checkbox} type="checkbox" />
      <label className={styles.custom_checkbox_label}>{gender}</label>
    </div>
  )
}
