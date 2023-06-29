import React from "react"
import styles from "../../styles/customCheckbox.module.css"

export default function CustomCheckbox({
  gender,
  maleGenderRef,
  femaleGenderRef,
}) {
  return (
    <div
      ref={gender === "male" ? maleGenderRef : femaleGenderRef}
      className={styles.checkbox_wrapper}
    >
      <input className={styles.custom_checkbox} type="checkbox" />
      <label className={styles.custom_checkbox_label}>{gender}</label>
    </div>
  )
}
