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

router.get("/addressInformation/:id", (req, res) => {
  const { id } = req.params

  const selectedAddress = addressInformation.filter((address) => {
    return address.id === id
  })

  res.json({ selectedAddress })
})

router.post("/addressInformation", (req, res) => {
  const { newAddress } = req.body

  addressInformation.push(newAddress)

  res.json({ addressInformation })
})

router.post("/addressInformation/update", (req, res) => {
  const { newAddress } = req.body

  addressInformation.forEach((address, index) => {
    if (address.id === newAddress.id) {
      addressInformation[index] = newAddress
    }
  })

  res.json({ addressInformation })
})

module.exports = router
