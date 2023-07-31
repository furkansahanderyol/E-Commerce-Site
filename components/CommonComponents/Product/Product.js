import React, { useState, useRef } from "react"
import Image from "next/image"
import Stars from "../Stars/Stars"
import FavoriteButton from "../FavoriteButton/FavoriteButton"
import { useRouter } from "next/router"
import { BsThreeDots } from "react-icons/bs"
import Options from "../Options/Options"
import styles from "../../../styles/commonComponentStyles/product.module.css"

export default function Product(props) {
  const {
    product,
    id,
    images,
    title,
    brand,
    category,
    rate,
    count,
    price,
    isFavorite,
    collection,
    isUpdate,
    setUpdateItems,
    selectedItems,
    setSelectedItems,
    notifications,
    setNotifications,
    isRemovable,
    setCollectionList,
    showCreateNewCollectionModal,
    setSelectedProduct,
  } = props

  const [collectionItemOptions, setCollectionItemOptions] = useState(false)
  const optionsRef = useRef(null)
  const router = useRouter()

  function handleProductClick(e) {
    const target = e.target
    const isValid = optionsRef?.current?.contains(target)

    if (isValid) return

    if (!e.target.matches("svg")) {
      router.push(`/category/${category}/${id}`)
    }
  }

  function handleSelectedItem() {
    if (selectedItems.includes(product)) {
      const updatedItems = selectedItems.filter((item) => {
        return item.id !== product.id
      })

      setSelectedItems(updatedItems)
      isUpdate ? setUpdateItems(selectedItems) : null
    } else {
      setSelectedItems([...selectedItems, product])
      isUpdate ? setUpdateItems([...selectedItems, product]) : null
    }
  }

  function handleCollectionItemOptions() {
    setCollectionItemOptions(!collectionItemOptions)
  }

  return collection ? (
    <div
      onClick={handleSelectedItem}
      className={styles.product}
      id={id}
      style={
        selectedItems.includes(product) ? { border: "1px solid green" } : null
      }
    >
      <div className={styles.favorite_button_wrapper}>
        <FavoriteButton
          product={product}
          square={false}
          isFavorite={isFavorite}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      </div>
      <div className={styles.product_image_wrapper_collection}>
        <Image src={images[0]} layout="fill" alt="Product image" />
      </div>
      <div className={styles.product_information}>
        <div className={styles.product_title}>
          <span className={styles.brand_name}>{brand} - </span>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.rate}>
          <div>
            <Stars rate={rate} />
          </div>
          <div className={styles.count}>{`(${rate})`}</div>
        </div>
        <div className={styles.price}>{`${price} $`}</div>
      </div>
    </div>
  ) : (
    <div onClick={handleProductClick} className={styles.product} id={id}>
      {isRemovable ? (
        <div className={styles.buttons_wrapper}>
          <div>
            <FavoriteButton
              product={product}
              square={false}
              isFavorite={isFavorite}
              notifications={notifications}
              setNotifications={setNotifications}
              isRemovable={isRemovable}
            />
          </div>
          <div
            onClick={handleCollectionItemOptions}
            className={styles.options_button_wrapper}
          >
            <BsThreeDots />
            <Options
              isCollectionItem={true}
              collectionItemOptions={collectionItemOptions}
              setCollectionItemOptions={setCollectionItemOptions}
              optionsRef={optionsRef}
              setCollectionList={setCollectionList}
              showCreateNewCollectionModal={showCreateNewCollectionModal}
              product={product}
              setSelectedProduct={setSelectedProduct}
            />
          </div>
        </div>
      ) : (
        <div className={styles.favorite_button_wrapper}>
          <FavoriteButton
            product={product}
            square={false}
            isFavorite={isFavorite}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
      )}
      <div className={styles.product_image_wrapper}>
        <Image src={images[0]} layout="fill" alt="Product image" />
      </div>
      <div className={styles.product_information}>
        <div className={styles.product_title}>
          <span className={styles.brand_name}>{brand} - </span>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.rate}>
          <div>
            <Stars rate={rate} />
          </div>
          <div className={styles.count}>{`(${rate})`}</div>
        </div>
        <div className={styles.price}>{`${price} $`}</div>
      </div>
    </div>
  )
}
