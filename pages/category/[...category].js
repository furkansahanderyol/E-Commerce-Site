import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Product from "@/components/Product/Product"
import FilterListElement from "@/components/FilterListElement/FilterListElement"
import FilterListHeader from "@/components/FilterListHeader/FilterListHeader"
import { RiStarFill } from "react-icons/ri"
import { RiStarLine } from "react-icons/ri"
import styles from "../../styles/Home.module.css"

export default function Home({ products, favorites }) {
  const router = useRouter()
  const [data, setData] = useState(
    products.filter((product) => {
      return product.category === router.query.category[0]
    })
  )
  const [brandsList, setBrandsList] = useState(false)
  const [priceList, setPriceList] = useState(false)
  const [avgCustomerReview, setAvgCustomerReview] = useState(false)
  const [brands, setBrands] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [gender, setGender] = useState(false)
  const brandsFilterList = useRef()

  function handleFilterClick() {
    setBrandsList(!brandsList)
  }

  function handlePriceListClick() {
    setPriceList(!priceList)
  }

  function handleAvgCustomerReviewClick() {
    setAvgCustomerReview(!avgCustomerReview)
  }

  function handleGenderListClick() {
    setGender(!gender)
  }

  function handleBrandFilterClick(e) {
    const filterList = e.target.closest("ul")
    const filters = [...filterList.querySelectorAll("li")]
    const selectedFilters = filters
      .map((filter) => {
        const checkbox = filter.querySelector("input")
        const brandName = filter.querySelector("label").textContent

        if (checkbox.checked) return brandName
      })
      .filter((brandName) => {
        if (brandName) return brandName
      })
      .join(",")

    router.push(
      {
        pathname: `/category/${router.query.category[0]}`,
        query: { brand: selectedFilters },
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    const relativeBrands = products.filter((product) => {
      return product.category === router.query.category[0]
    })

    const brandNames = relativeBrands.map((product) => {
      return product.brand
    })

    const filteredBrandNames = [...new Set(brandNames)]

    setBrands(filteredBrandNames)
  }, [router.query.category])

  useEffect(() => {
    if (router.query.brand) {
      fetch(
        `/api/category/${router.query.category[0]}?brand=${router.query.brand}`
      )
        .then((response) => response.json())
        .then((data) => setData(data.products))
        .catch((error) => console.error(error))
    }
  }, [router.query])

  useEffect(() => {
    const matchedProducts = []

    products.map((product) => {
      favorites.favorites.map((favorite) => {
        if (parseInt(product.id) === parseInt(favorite.product.id)) {
          if (!matchedProducts.includes(product)) {
            matchedProducts.push(product)
          }
        }
      })
    })

    setFavoriteProducts(matchedProducts)
  }, [])

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
              <ul ref={brandsFilterList} className={styles.filter_list}>
                {brands.map((brand, index) => {
                  return (
                    <li
                      onClick={handleBrandFilterClick}
                      className={styles.filter_list_element}
                      key={index}
                    >
                      <FilterListElement
                        brand={brand}
                        selectedBrands={selectedBrands}
                      />
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
                    <button type="submit">Go</button>
                  </span>
                </div>
              </>
            ) : null}
          </div>
          <div onClick={handleAvgCustomerReviewClick}>
            <FilterListHeader
              header={"Average customer review"}
              list={avgCustomerReview}
            />
          </div>
          <div className={styles.average_customer_review_wrapper}>
            {avgCustomerReview ? (
              <ul className={styles.average_customer_review_list}>
                <li>
                  <RiStarFill />
                  <RiStarFill />
                  <RiStarFill />
                  <RiStarFill />
                  <RiStarLine />
                  <span> & up</span>
                </li>
                <li>
                  <RiStarFill />
                  <RiStarFill />
                  <RiStarFill />
                  <RiStarLine />
                  <RiStarLine />
                  <span> & up</span>
                </li>
                <li>
                  <RiStarFill />
                  <RiStarFill />
                  <RiStarLine />
                  <RiStarLine />
                  <RiStarLine />
                  <span> & up</span>
                </li>
                <li>
                  <RiStarFill />
                  <RiStarLine />
                  <RiStarLine />
                  <RiStarLine />
                  <RiStarLine />
                  <span> & up</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div onClick={handleGenderListClick}>
            <FilterListHeader header={"Gender"} list={gender} />
          </div>
          <div>
            {gender ? (
              <ul className={styles.gender_list}>
                <li>
                  <FilterListElement brand={"Male"} />
                </li>
                <li>
                  <FilterListElement brand={"Female"} />
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.home_grid}>
        {data.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              id={product.id}
              title={product.title}
              brand={product.brand}
              category={product.category}
              thumbnail={product.thumbnail}
              images={product.images}
              rate={product.rating}
              count={product.rating.count}
              price={product.price}
              isFavorite={favoriteProducts.includes(product)}
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const category = params.category[0]

  const categoryResponse = await fetch(
    `http://localhost:3000/api/category/${category}`
  )
  const favoritesResponse = await fetch("http://localhost:3000/api/favorites")
  const categoryProductsData = await categoryResponse.json()
  const favoriteProductsData = await favoritesResponse.json()

  return {
    props: {
      products: categoryProductsData.products,
      favorites: favoriteProductsData,
    },
  }
}
