const server = require("express")
const router = server.Router()
const uuid = require("uuid")
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

let addressInformation = []

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

  console.log("newAddress", newAddress)
  console.log(addressInformation)
  res.json({ addressInformation })
})

router.delete("/addressInformation/:id", (req, res) => {
  const { id } = req.params

  addressInformation = addressInformation.filter((address) => {
    return address.id !== id
  })

  res.json({ addressInformation })
})

module.exports = router
