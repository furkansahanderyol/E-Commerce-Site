const server = require("express")
const router = server.Router()
const axios = require("axios")

router.get("/favorites", (req, res) => {
  axios.get("https:dummyjson.com/products?limit=100").then((response) => {
    res.json({})
  })
})

module.exports = router
