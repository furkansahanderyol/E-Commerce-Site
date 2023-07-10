const server = require("express")
const router = server.Router()
const uuid = require("uuid")
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

let orders = []

router.get("/orders", (req, res) => {
  res.json({ orders })
})

router.post("/orders", (req, res) => {
  const { selectedAddress } = req.body

  const isContained = orders.some((order) => order.id === selectedAddress.id)

  isContained ? null : orders.push(selectedAddress)

  res.json({ orders })
})

module.exports = router
