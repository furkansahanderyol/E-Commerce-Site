const server = require("express")
const router = server.Router()
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

let cart = []

router.get("/cart", (req, res) => {
  res.json({ cart: cart })
})

router.post("/cart", (req, res) => {
  const product = req.body.product

  cart.push(product)

  res.json({ cart: cart })
})

router.delete("/cart", (req, res) => {
  const deletedItemId = req.query.id

  cart = cart.filter((item) => {
    return item.id != deletedItemId
  })

  res.json({ cart: cart })
})

module.exports = router
