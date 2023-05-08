const server = require("express")
const router = server.Router()
const axios = require("axios")

router.get("/:category", (req, res) => {
  const selectedCategory = req.params.category
  const { brand } = req.query

  const searchedBrands = brand && brand.split(",")

  if (!searchedBrands || searchedBrands.length === 0) {
    axios.get("https:dummyjson.com/products?limit=100").then((response) => {
      const products = response.data.products
      const searchedProducts = products.filter((product) => {
        return product.category === selectedCategory
      })

      res.json({ products: searchedProducts })
    })
  } else {
    axios.get("https:dummyjson.com/products?limit=100").then((response) => {
      const products = response.data.products
      const matchedProducts = products.filter((product) => {
        if (
          selectedCategory === product.category &&
          searchedBrands.includes(product.brand)
        ) {
          return product
        }
      })

      console.log(matchedProducts)
      res.json({ products: matchedProducts })
    })
  }
})

module.exports = router
