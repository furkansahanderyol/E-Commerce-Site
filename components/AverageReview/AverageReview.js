import React from "react"
import { RiStarFill } from "react-icons/ri"
import { RiStarLine } from "react-icons/ri"
import styles from "../../styles/averageReview.module.css"

export default function AverageReview({ queryParameters, setQueryParameters }) {
  function handleReviewClick(e) {
    const rating = e.target.getAttribute("data-rate")

    setQueryParameters((prevParameters) => ({
      ...prevParameters,
      rating,
    }))
  }

  return (
    <ul
      onClick={handleReviewClick}
      className={styles.average_customer_review_list}
    >
      <li data-rate={[4, 5]}>
        <RiStarFill />
        <RiStarFill />
        <RiStarFill />
        <RiStarFill />
        <RiStarLine />
        <span> & up</span>
      </li>
      <li data-rate={[3, 4]}>
        <RiStarFill />
        <RiStarFill />
        <RiStarFill />
        <RiStarLine />
        <RiStarLine />
        <span> & up</span>
      </li>
      <li data-rate={[2, 3]}>
        <RiStarFill />
        <RiStarFill />
        <RiStarLine />
        <RiStarLine />
        <RiStarLine />
        <span> & up</span>
      </li>
      <li data-rate={[1, 2]}>
        <RiStarFill />
        <RiStarLine />
        <RiStarLine />
        <RiStarLine />
        <RiStarLine />
        <span> & up</span>
      </li>
    </ul>
  )
}
