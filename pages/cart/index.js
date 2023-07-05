import React, { useState, useEffect } from "react"
import CartItem from "@/components/CartPageComponents/CartItem/CartItem"
import axios from "axios"
import SavedAddress from "@/components/MyAccountPageComponents/SavedAddress/SavedAddress"
import CreateAddressButton from "@/components/CartPageComponents/CreateAddressButton/CreateAddressButton"
import CreateAddressForm from "@/components/MyAccountPageComponents/CreateAddressForm/CreateAddressForm"
import styles from "../../styles/cartPageStyles/cart.module.css"

export default function Cart({ cart = [], addresses, countryData, API_KEY }) {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [chooseAddressModal, setChooseAddressModal] = useState(false)
  const [createAddressForm, setCreateAddressForm] = useState(false)

  useEffect(() => {
    setCartItems(cart)
  }, [cart])

  useEffect(() => {
    const calculateTotalPrice = cartItems.reduce((accumulator, value) => {
      return accumulator + value.items[0]?.price * value.items.length
    }, 0)

    setTotalPrice(calculateTotalPrice)
  }, [cartItems])

  function handleCompleteOrder() {
    setChooseAddressModal(true)
  }

  return (
    <>
      <div className={styles.cart_wrapper}>
        <div className={styles.cart_header}>
          <div className={styles.header}>
            My cart
            <span
              className={styles.total_item}
            >{` (${cartItems.length} items)`}</span>
          </div>
        </div>
        <div className={styles.cart_information}>
          <div className={styles.added_items}>
            {cartItems?.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  product={item?.items[0]}
                  productImage={item?.items[0].thumbnail}
                  productName={item?.items[0].title}
                  productPrice={item?.items[0].price}
                  productQuantity={item?.items.length}
                  setCartItems={setCartItems}
                />
              )
            })}
          </div>
          <div className={styles.overall_price}>
            <div className={styles.order_summary}>Order summary</div>
            <div className={styles.total_price}>
              Total price: <span>{`${totalPrice}$`}</span>
            </div>
            <div
              onClick={handleCompleteOrder}
              className={styles.complete_the_order_button}
            >
              <button>Complete the order</button>
            </div>
          </div>
        </div>
      </div>
      {chooseAddressModal ? (
        <div className={styles.choose_address_modal}>
          <div className={styles.choose_address_modal_header}>
            Choose your address
          </div>
          <div className={styles.choose_address_grid}>
            <CreateAddressButton setCreateAddressForm={setCreateAddressForm} />
            {addresses.map((address) => {
              return (
                <SavedAddress
                  location={"cart"}
                  key={address.id}
                  name={address.name}
                  street={address.street}
                  city={address.city}
                  country={address.country}
                />
              )
            })}
          </div>
        </div>
      ) : null}
      {createAddressForm ? (
        <CreateAddressForm
          countryData={countryData}
          API_KEY={API_KEY}
          setCreateAddressForm={setCreateAddressForm}
        />
      ) : null}
    </>
  )
}

export async function getServerSideProps() {
  const cartResponse = await axios.get("http://localhost:3000/api/cart")
  const addressResponse = await axios.get(
    "http://localhost:3000/api/addressInformation"
  )
  const countryInformationResponse = await axios.get(
    "http://localhost:3000/api/countryInformation"
  )
  const cartData = await cartResponse.data
  const addressData = await addressResponse.data
  const countryData = await countryInformationResponse.data
  const API_KEY = "plac1dusax"

  return {
    props: {
      cart: cartData.cart,
      addresses: addressData.addressInformation,
      countryData: countryData,
      API_KEY,
    },
  }
}
