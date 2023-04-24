import React, { useState, useRef } from "react"
import Product from "@/components/Product/Product"
import FilterListElement from "@/components/FilterListElement/FilterListElement"
import FilterListHeader from "@/components/FilterListHeader/FilterListHeader"
import styles from "../styles/Home.module.css"

export default function Home({ data }) {
  const [brandsList, setBrandsList] = useState(false)
  const [priceList, setPriceList] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const minPriceRef = useRef()
  const maxPriceRef = useRef()

  const allBrands = data.map((product) => {
    return product.brand
  })
  const brands = [...new Set(allBrands)]

  function handleFilterClick() {
    setBrandsList(!brandsList)
  }

  function handlePriceListClick() {
    setPriceList(!priceList)
  }

  function handleCustomPrice() {
    const min = minPriceRef.current.value
    const max = maxPriceRef.current.value

    console.log(min)
    console.log(max)
  }

  return (
    <div className={styles.homepage_wrapper}>
      <div className={styles.filters}>
        <h3>Filters</h3>
        <div>
          <div onClick={handleFilterClick}>
            <FilterListHeader header={"Featured brands"} list={brandsList} />
          </div>
          <div>
            {brandsList ? (
              <ul className={styles.filter_list}>
                {brands.map((brand, index) => {
                  return (
                    <li className={styles.filter_list_element} key={index}>
                      <FilterListElement brand={brand} />
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
          <div onClick={handlePriceListClick}>
            <FilterListHeader header={"Price"} list={priceList} />
          </div>
          <div className={styles.price_list_wrapper}>
            {priceList ? (
              <>
                <ul
                  className={`${styles.filter_list} ${styles.filter_list_price}`}
                >
                  <li className={styles.price_list_element}>0$ to 25$</li>
                  <li className={styles.price_list_element}>25$ to 50$</li>
                  <li className={styles.price_list_element}>50$ to 100$</li>
                  <li className={styles.price_list_element}>200$ & Above</li>
                </ul>
                <div className={styles.price_i}>
                  <span>
                    <input
                      ref={minPriceRef}
                      className={styles.price_input}
                      type="number"
                      placeholder="Min $"
                    />
                  </span>
                  <span>
                    <input
                      ref={maxPriceRef}
                      className={styles.price_input}
                      type="number"
                      placeholder="Max $"
                    />
                    <button onClick={handleCustomPrice} type="submit">
                      Go
                    </button>
                  </span>
                </div>
              </>
            ) : null}
          </div>

          {/* avg. customer review */}
          {/* price */}
          {/* Availability */}
        </div>
      </div>
      <div className={styles.home_grid}>
        {data.map((product) => {
          return (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              brand={product.brand}
              images={product.images}
              rate={product.rating}
              count={product.rating.count}
              price={product.price}
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://dummyjson.com/products?limit=100")
  const data = await response.json()

  return {
    props: {
      data: data.products,
    },
  }
}
