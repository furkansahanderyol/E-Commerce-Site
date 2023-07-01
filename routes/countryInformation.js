const { default: axios } = require("axios")
const server = require("express")
const router = server.Router()
const uuid = require("uuid")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

router.get("/countryInformation", async (req, res) => {
  const countriesResponse = await axios.get(
    "http://api.geonames.org/countryInfoJSON?username=plac1dusax"
  )
  const countryInformation = await countriesResponse.data

  res.json({ countryInformation })
})

module.exports = router
