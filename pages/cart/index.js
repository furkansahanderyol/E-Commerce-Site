import React, { useState, useEffect, useContext } from "react"
import CartItem from "@/components/CartPageComponents/CartItem/CartItem"
import axios from "axios"
import SavedAddress from "@/components/MyAccountPageComponents/SavedAddress/SavedAddress"
import CreateAddressButton from "@/components/CartPageComponents/CreateAddressButton/CreateAddressButton"
import CreateAddressForm from "@/components/MyAccountPageComponents/CreateAddressForm/CreateAddressForm"
import { AddressFormContext } from "@/components/CommonComponents/AddressFormContext/AddressFormContext"
import { AiOutlineClose } from "react-icons/ai"
import Overlay from "@/components/CommonComponents/Overlay/Overlay"
import CustomButton from "@/components/CommonComponents/CustomButton/CustomButton"
import styles from "../../styles/cartPageStyles/cart.module.css"

export default function Cart({ cart = [], addressData, countryData, API_KEY }) {
  const {
    createAddressForm,
    setCreateAddressForm,
    editAddress,
    setEditAddress,
    editAddressForm,
    setEditAddressForm,
    addresses,
    setAddresses,
  } = useContext(AddressFormContext)

  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [chooseAddressModal, setChooseAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)

  useEffect(() => {
    setAddresses(addressData)
  }, [])

  useEffect(() => {
    setCartItems(cart)
  }, [cart])

  useEffect(() => {
    console.log("addresses", addresses)
  }, [addresses])

  useEffect(() => {
    const calculateTotalPrice = cartItems.reduce((accumulator, value) => {
      return accumulator + value.items[0]?.price * value.items.length
    }, 0)

    setTotalPrice(calculateTotalPrice)
  }, [cartItems])

  function handleChooseAddressModalClose() {
    setChooseAddressModal(false)
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
            <div className={styles.complete_the_order_button}>
              <CustomButton
                location={"cart"}
                value={"Complete the order"}
                cartItems={cartItems}
                setChooseAddressModal={setChooseAddressModal}
              />
            </div>
          </div>
        </div>
      </div>
      {chooseAddressModal ? (
        <>
          <div className={styles.choose_address_modal}>
            <div className={styles.choose_address_modal_header}>
              Choose your address
              <AiOutlineClose onClick={handleChooseAddressModalClose} />
            </div>
            <div className={styles.choose_address_grid}>
              <CreateAddressButton
                setCreateAddressForm={setCreateAddressForm}
              />
              {addresses?.addressInformation?.map((address) => {
                return (
                  <SavedAddress
                    location={"cart"}
                    key={address.id}
                    id={address.id}
                    addressName={address.addressName}
                    name={address.name}
                    surname={address.surname}
                    street={address.street}
                    province={address.province}
                    country={address.country}
                    setEditAddressForm={setEditAddressForm}
                    setEditAddress={setEditAddress}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    items={cartItems}
                    totalPrice={totalPrice}
                  />
                )
              })}
            </div>
            <div className={styles.order_button}>
              <CustomButton
                location={"chooseAddressModal"}
                value={"Order"}
                selectedAddress={selectedAddress}
                setChooseAddressModal={setChooseAddressModal}
              />
            </div>
          </div>
          <Overlay />
        </>
      ) : null}
      {createAddressForm ? (
        <CreateAddressForm
          countryData={countryData}
          API_KEY={API_KEY}
          setCreateAddressForm={setCreateAddressForm}
          editAddressForm={editAddressForm}
          setEditAddressForm={setEditAddressForm}
          editAddress={editAddress}
          setEditAddress={setEditAddress}
          setAddresses={setAddresses}
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
      addressData: addressData,
      countryData: countryData,
      API_KEY,
    },
  }
}
