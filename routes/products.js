const server = require("express")
const router = server.Router()
const axios = require("axios")

router.get("/:id", (req, res) => {
  const id = req.params.id
  axios.get("https:dummyjson.com/products?limit=100").then((response) => {
    const products = response.data.products
    const searchedProduct = products.filter((product) => {
      return product.id === parseInt(id)
    })

    res.json({ products: searchedProduct })
  })
})

module.exports = router
