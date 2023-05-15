import React, { useState, useEffect, useRef } from "react"
import { FaAngleLeft, FaArrowCircleRight } from "react-icons/fa"
import { FaAngleRight } from "react-icons/fa"
import Image from "next/image"
import styles from "../../styles/ProductImage.module.css"

export default function ProductImage(props) {
  const {
    index,
    image,
    mini,
    productImage,
    setProductImage,
    totalImageCount,
    setImageZoom,
    mousePosition,
    setMousePosition,
    zoomedImageRef,
    zoomedImageStyles,
    setZoomedImageStyles,
  } = props
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef(null)
  const cursorSquareRef = useRef(null)

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

  function handleProductImageHover() {
    setIsVisible(true)
    setImageZoom(true)
  }

  function handleProductImageHoverOut() {
    setIsVisible(false)
    setImageZoom(false)
  }

  function handleZoomedImage(e) {
    const imageElement = imageRef?.current
    const imageElementCoordinates = imageElement.getBoundingClientRect()
    const zoomedImage = zoomedImageRef?.current
    const x = e.clientX - imageElementCoordinates.left
    const y = e.clientY - imageElementCoordinates.top
    const zoomX = (x / imageElement.offsetWidth) * 100
    const zoomY = (y / imageElement.offsetHeight) * 100

    setZoomedImageStyles({
      backgroundImage: `url(${image})`,
      backgroundPosition: `${zoomX}% ${zoomY}%`,
      backgroundSize: `400%`,
      left: `${x - zoomedImage?.offsetWidth / 2}px`,
      top: `${y - zoomedImage?.offsetHeight / 2}px`,
    })
  }

  useEffect(() => {
    const image = imageRef.current

    const mouseMoveFunction = (e) => {
      setMousePosition({ x: e.offsetX, y: e.offsetY })
    }

    image?.addEventListener("mousemove", mouseMoveFunction)

    return () => {
      image?.removeEventListener("mousemove", mouseMoveFunction)
    }
  }, [])

  if (cursorSquareRef.current) {
    cursorSquareRef.current.style.transform = `translate3d(${
      mousePosition.x - cursorSquareRef.current.offsetWidth / 2
    }px, ${mousePosition.y - cursorSquareRef.current.offsetHeight / 2}px, 0)`
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
        ref={imageRef}
        className={styles.product_image}
        onMouseEnter={handleProductImageHover}
        onMouseLeave={handleProductImageHoverOut}
        onMouseMove={handleZoomedImage}
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
      {isVisible ? (
        <div ref={cursorSquareRef} className={styles.square_cursor} />
      ) : null}
    </div>
  )
}
