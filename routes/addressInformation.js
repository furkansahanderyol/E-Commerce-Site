const server = require("express")
const router = server.Router()
const uuid = require("uuid")
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

const addressInformation = []

router.get("/addressInformation", (req, res) => {
  res.json({ addressInformation })
})

router.post("/addressInformation", (req, res) => {
  const { newAddress } = req.body

  addressInformation.push(newAddress)

  res.json({ addressInformation })
})

module.exports = router
