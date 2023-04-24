import React, { useState } from "react"
import Product from "@/components/Product/Product"
import FilterListElement from "@/components/FilterListElement/FilterListElement"
import FilterListHeader from "@/components/FilterListHeader/FilterListHeader"
import styles from "../styles/Home.module.css"

export default function Home({ data }) {
  const [brandsList, setBrandsList] = useState(false)

  const allBrands = data.map((product) => {
    return product.brand
  })
  const brands = [...new Set(allBrands)]

  function handleFilterClick(e) {
    setBrandsList(!brandsList)
  }

  return (
    <div className={styles.homepage_wrapper}>
      <div className={styles.filters}>
        <h3>Filters</h3>
        <div>
          <div onClick={handleFilterClick}>
            <FilterListHeader brandsList={brandsList} />
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
