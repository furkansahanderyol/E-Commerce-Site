import React from "react"
import Image from "next/image"
import Stars from "../Stars/Stars"
import FavoriteButton from "../FavoriteButton/FavoriteButton"
import { useRouter } from "next/router"
import styles from "../../styles/product.module.css"

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
  } = props

  const router = useRouter()

  function handleProductClick() {
    router.push(`/category/${category}/${id}`)
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
          <div className={styles.count}>{`(${count})`}</div>
        </div>
        <div className={styles.price}>{`${price} $`}</div>
      </div>
    </div>
  ) : (
    <div onClick={handleProductClick} className={styles.product} id={id}>
      <div className={styles.favorite_button_wrapper}>
        <FavoriteButton
          product={product}
          square={false}
          isFavorite={isFavorite}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      </div>
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
          <div className={styles.count}>{`(${count})`}</div>
        </div>
        <div className={styles.price}>{`${price} $`}</div>
      </div>
    </div>
  )
}
