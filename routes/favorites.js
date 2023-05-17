const server = require("express")
const router = server.Router()
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

let favorites = []
let collections = []

router.get("/favorites", (req, res) => {
  res.json({ favorites: favorites, collections: collections })

  console.log("SUCCESS")
})

router.post("/favorites", (req, res) => {
  const data = req.body

  favorites.push(data)
})

module.exports = router
