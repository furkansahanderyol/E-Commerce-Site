const server = require("express")
const router = server.Router()
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

let filteredProducts = []

router.get("/:category", async (req, res) => {
  const category = req.params.category
  const brands = req.query.brand
  const minPrice = req.query.minPrice
  const maxPrice = req.query.maxPrice
  const rating = req.query.rating?.split(",")

  const response = await axios.get("https:dummyjson.com/products?limit=100")
  const data = await response.data.products

  filteredProducts = data.filter((product) => {
    return product.category === category
  })

  if (brands) {
    const brandNames = brands.split(",")

    filteredProducts = filteredProducts.filter((product) => {
      return brandNames.includes(product.brand)
    })
  }

  if (minPrice && maxPrice) {
    filteredProducts = filteredProducts.filter((product) => {
      const productPrice = parseInt(product.price)

      return (
        parseInt(minPrice) <= productPrice && productPrice < parseInt(maxPrice)
      )
    })
  }

  if (rating) {
    const minRate = rating[0]
    const maxRate = rating[1]

    filteredProducts = filteredProducts.filter((product) => {
      const productRating = parseFloat(product.rating)

      return (
        parseInt(minRate) <= productRating && productRating <= parseInt(maxRate)
      )
    })
  }

  res.json({ products: filteredProducts })
})

module.exports = router
