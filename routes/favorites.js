const server = require("express")
const router = server.Router()

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

let favorites = []

router.get("/favorites", (req, res) => {
  res.json({ favorites: favorites })
})

router.post("/favorites", (req, res) => {
  const product = req.body
  const productId = product.product.id

  const count = favorites.filter((item) => {
    return item.product.id === productId
  }).length

  if (count < 1) {
    favorites.push(product)
    res.json({ favorites: favorites })
  } else {
    res.json({ favorites: favorites })
  }
})

router.delete("/favorites", (req, res) => {
  const deletedItem = req.body

  favorites = favorites.filter((product) => {
    return product.product.id !== deletedItem.id
  })

  res.json({ favorites: favorites })
})

module.exports = router
