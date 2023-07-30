const server = require("express")
const router = server.Router()
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

router.get("/allProducts", (req, res) => {
  axios.get("https:dummyjson.com/products?limit=100").then((response) => {
    const products = response.data.products

    res.json({ products })
  })
})

module.exports = router
