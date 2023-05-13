import React from "react"
import { FaAngleLeft } from "react-icons/fa"
import { FaAngleRight } from "react-icons/fa"
import Image from "next/image"
import styles from "../../styles/ProductImage.module.css"

export default function ProductImage(props) {
  const { index, image, mini, productImage, setProductImage, totalImageCount } =
    props

  function handleLeftArrowClick() {
    setProductImage((prevIndex) => {
      if (prevIndex <= 0) return (prevIndex = totalImageCount - 1)
      return prevIndex - 1
    })
  }

  function handleRightArrowClick() {
    setProductImage((prevIndex) => {
      if (prevIndex >= totalImageCount - 1) return (prevIndex = 0)
      return prevIndex + 1
    })
  }

  function handleMiniProductImageClick(e) {
    const clickedImageIndex = e.target.getAttribute("index")

    setProductImage(parseInt(clickedImageIndex))
  }

  return mini ? (
    <div
      onClick={handleMiniProductImageClick}
      className={
        index === productImage
          ? `${styles.product_image_wrapper_mini} ${styles.product_image_wrapper_mini_selected} `
          : styles.product_image_wrapper_mini
      }
    >
      <Image
        index={index}
        className={styles.product_image_mini}
        src={image}
        alt="Product image"
        layout="fill"
      />
    </div>
  ) : (
    <div className={styles.product_image_wrapper}>
      <Image
        className={styles.product_image}
        src={image}
        alt="Product image"
        layout="fill"
      />
      <div className={styles.arrow_left}>
        {<FaAngleLeft onClick={handleLeftArrowClick} />}
      </div>
      <div className={styles.arrow_right}>
        {<FaAngleRight onClick={handleRightArrowClick} />}
      </div>
    </div>
  )
}
