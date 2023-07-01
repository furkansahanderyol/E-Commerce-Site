const server = require("express")
const router = server.Router()
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

const addressInformation = []

router.get("/addressInformation", (req, res) => {
  res.json({ addressInformation })
})

module.exports = router
