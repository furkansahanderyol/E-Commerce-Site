import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Product from "@/components/CommonComponents/Product/Product"
import FilterListElement from "@/components/CategoryPageComponents/FilterListElement/FilterListElement"
import FilterListHeader from "@/components/CategoryPageComponents/FilterListHeader/FilterListHeader"
import Notification from "@/components/CommonComponents/Notification/Notification"
import AverageReview from "@/components/CategoryPageComponents/AverageReview/AverageReview"
import axios from "axios"
import NotificationsWrapper from "@/components/CommonComponents/NotificationsWrapper/NotificationsWrapper"
import styles from "../../styles/categoryPageStyles/category.module.css"

export default function Home({
  products,
  favorites,
  previousQueryParameters,
  category,
}) {
  const router = useRouter()
  const [data, setData] = useState(null)
  const [brandsList, setBrandsList] = useState(false)
  const [priceList, setPriceList] = useState(false)
  const [avgCustomerReview, setAvgCustomerReview] = useState(false)
  const [brands, setBrands] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [notifications, setNotifications] = useState([])
  const [queryParameters, setQueryParameters] = useState(
    previousQueryParameters
  )
  const [filterHistory, setFilterHistory] = useState({})
  const brandsFilterList = useRef()
  const minPriceRef = useRef()
  const maxPriceRef = useRef()

  function handleFilterClick() {
    setBrandsList(!brandsList)
  }

  function handlePriceListClick() {
    setPriceList(!priceList)
  }

  function handleAvgCustomerReviewClick() {
    setAvgCustomerReview(!avgCustomerReview)
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

    setQueryParameters((prevParameters) => {
      return {
        ...prevParameters,
        brand: selectedFilters,
      }
    })
  }

  function selectPriceRange(e) {
    const clickedElement = e.target
    const dataPrice = clickedElement.getAttribute("data-price")
    const selectedPrice = dataPrice.split(",").map(Number)

    setQueryParameters((prevParameters) => ({
      ...prevParameters,
      minPrice: selectedPrice[0],
      maxPrice: selectedPrice[1],
    }))
  }

  useEffect(() => {
    setFilterHistory(queryParameters)
  }, [])

  useEffect(() => {
    const isNull = Object.values(filterHistory).every((value) => {
      return value === null
    })

    if (!isNull) {
      setQueryParameters(filterHistory)
      setSelectedBrands(filterHistory.brand)
    }
  }, [filterHistory])

  useEffect(() => {}, [])

  useEffect(() => {
    router.push(
      {
        pathname: `/category/${router.query.category[0]}`,
        query: queryParameters,
      },
      undefined,
      { shallow: true }
    )
  }, [queryParameters])

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
    const isNull = Object.values(previousQueryParameters).every((value) => {
      return value === null
    })

    axios
      .get(`http://localhost:3000/api/category/${router.query.category[0]}`, {
        params: queryParameters,
      })
      .then((response) => {
        return setData(response.data.products)
      })
  }, [queryParameters, category])

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (notifications.length > 0) {
        const currentNotifications = [...notifications]
        currentNotifications.pop()

        setNotifications(currentNotifications)
      }
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [notifications])

  return (
    <>
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
                        key={index}
                        onClick={handleBrandFilterClick}
                        className={styles.filter_list_element}
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
                    onClick={selectPriceRange}
                    className={`${styles.filter_list} ${styles.filter_list_price}`}
                  >
                    <li
                      data-price={[0, 25]}
                      className={styles.price_list_element}
                    >
                      0$ to 25$
                    </li>
                    <li
                      data-price={[25, 50]}
                      className={styles.price_list_element}
                    >
                      25$ to 50$
                    </li>
                    <li
                      data-price={[50, 100]}
                      className={styles.price_list_element}
                    >
                      50$ to 100$
                    </li>
                    <li
                      data-price={[100, 200]}
                      className={styles.price_list_element}
                    >
                      100$ to 200$
                    </li>
                    <li
                      data-price={[200, 201]}
                      className={styles.price_list_element}
                    >
                      200$ & Above
                    </li>
                  </ul>
                  <div className={styles.price_input_values}>
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
                    </span>
                    <button
                      className={styles.custom_price_button}
                      type="submit"
                    >
                      Go
                    </button>
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
                <AverageReview
                  queryParameters={queryParameters}
                  setQueryParameters={setQueryParameters}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.home_grid}>
          {data?.map((product) => {
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
                collection={false}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )
          })}
        </div>
      </div>
      <NotificationsWrapper
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { query } = context

  const queryParameters = {
    brand: query.brand || null,
    minPrice: query.minPrice || null,
    maxPrice: query.maxPrice || null,
    rating: query.rating || null,
  }
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
      previousQueryParameters: queryParameters,
      category: category,
    },
  }
}
