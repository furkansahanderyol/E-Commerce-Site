import React from "react"
import axios from "axios"
import { useRouter } from "next/router"
import styles from "../../../styles/commonComponentStyles/customButton.module.css"

export default function CustomButton(props) {
  const {
    location,
    value,
    selectedAddress,
    cartItems,
    setChooseAddressModal,
    setCreateAddressForm,
    updateName,
    updateSurname,
    updateEmail,
    updateGender,
  } = props

  const router = useRouter()

  async function handleCustomButtonClick() {
    switch (location) {
      case "chooseAddressModal":
        if (selectedAddress) {
          try {
            axios.post("http://localhost:3000/api/orders", {
              selectedAddress,
            })

            router.push("/cart/OrderConfirmed")
          } catch (error) {
            console.log(error)
          }
        }

        try {
          axios.delete("http://localhost:3000/api/cart/clear")
        } catch (error) {
          console.log(error)
        }
        break
      case "cart":
        if (cartItems.length > 0) {
          setChooseAddressModal(true)
        }
        break
      case "addressInformation":
        setCreateAddressForm(true)
        break
      case "accountInformation":
        try {
          axios.post("http://localhost:3000/api/accountInformation/update", {
            updateName,
            updateSurname,
            updateEmail,
            updateGender,
          })
        } catch (error) {
          console.log(error)
        }

        try {
          axios
            .get("http://localhost:3000/api/accountInformation")
            .then((response) => {
              setData(response)
            })

          router.reload()
        } catch (error) {
          console.log(error)
        }

        break
    }
  }

  return (
    <button
      type={location === "addressForm" ? "submit" : "button"}
      onClick={handleCustomButtonClick}
      className={styles.custom_button}
    >
      {value}
    </button>
  )
}
