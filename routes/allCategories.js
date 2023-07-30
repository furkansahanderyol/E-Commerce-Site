const server = require("express")
const router = server.Router()
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

router.get("/allCategories", (req, res) => {
  axios.get("https:dummyjson.com/products?limit=100").then((response) => {
    const products = response.data
    const categoriesSet = new Set()

    products.products.map((product) => {
      categoriesSet.add(product.category)
    })

    const categories = Array.from(categoriesSet)

    res.json({ categories })
  })
})

module.exports = router
