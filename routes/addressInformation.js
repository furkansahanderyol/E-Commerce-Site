const server = require("express")
const router = server.Router()
const uuid = require("uuid")
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

const addressInformation = [
  {
    id: uuid.v4(),
    name: "Home",
    street: "1234 Main St",
    city: "Cityville, State 5678",
    country: "USA",
  },
  {
    id: uuid.v4(),
    name: "Home",
    street: "1234 Main St",
    city: "Cityville, State 5678",
    country: "USA",
  },
  {
    id: uuid.v4(),
    name: "Home",
    street: "1234 Main St",
    city: "Cityville, State 5678",
    country: "USA",
  },
  {
    id: uuid.v4(),
    name: "Home",
    street: "1234 Main St",
    city: "Cityville, State 5678",
    country: "USA",
  },
  {
    id: uuid.v4(),
    name: "Home",
    street: "1234 Main St",
    city: "Cityville, State 5678",
    country: "USA",
  },
  {
    id: uuid.v4(),
    name: "Home",
    street: "1234 Main St",
    city: "Cityville, State 5678",
    country: "USA",
  },
]

router.get("/addressInformation", (req, res) => {
  res.json({ addressInformation })
})

module.exports = router
