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
  const newItem = {
    id: product.id,
    items: [product],
  }

  const isAlreadyAdded = cart.some((item) => {
    return item.id === product.id
  })

  if (isAlreadyAdded) {
    cart.forEach((item) => {
      item.id === product.id ? item.items.push(product) : null
    })
  } else {
    cart.push(newItem)
  }

  res.json({ cart: cart })
})

router.delete("/cart", (req, res) => {
  const deletedItemId = req.query.id

  cart = cart.filter((item) => {
    return item.id != deletedItemId
  })

  res.json({ cart: cart })
})

router.post("/cart/increase", (req, res) => {
  const productId = req.body.product.id
  const product = req.body.product

  cart.forEach((item) => {
    item.id === productId ? item.items.push(product) : null
  })

  res.json({ cart: cart })
})

module.exports = router
