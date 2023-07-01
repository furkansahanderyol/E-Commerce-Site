import React from "react"
import { RiStarFill } from "react-icons/ri"
import { RiStarHalfFill } from "react-icons/ri"
import { RiStarLine } from "react-icons/ri"
import styles from "../../../styles/commonComponentStyles/stars.module.css"

export default function Stars({ rate }) {
  let stars = []
  const rateArr = Array.from(String(rate))

  const wholeNumber = parseInt(rateArr[0])
  const fraction = parseFloat(rateArr?.[2])

  switch (wholeNumber) {
    case 0:
      stars = [
        <RiStarLine />,
        <RiStarLine />,
        <RiStarLine />,
        <RiStarLine />,
        <RiStarLine />,
      ]
      break
    case 1:
      stars = [<RiStarFill />]
      break
    case 2:
      stars = [<RiStarFill />, <RiStarFill />]
      break
    case 3:
      stars = [<RiStarFill />, <RiStarFill />, <RiStarFill />]
      break
    case 4:
      stars = [<RiStarFill />, <RiStarFill />, <RiStarFill />, <RiStarFill />]
      break
    case 5:
      stars = [
        <RiStarFill />,
        <RiStarFill />,
        <RiStarFill />,
        <RiStarFill />,
        <RiStarFill />,
      ]
      break
  }

  if (fraction) {
    stars.push(<RiStarHalfFill />)
  }

  while (stars.length < 5) {
    stars.push(<RiStarLine />)
  }

  return (
    <div className={styles.star}>
      {stars.map((star, index) => {
        return <span key={index}>{star}</span>
      })}
    </div>
  )
}
