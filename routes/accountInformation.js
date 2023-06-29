const server = require("express")
const router = server.Router()
const axios = require("axios")

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

const accountInformation = {
  name: "John",
  surname: "Doe",
  email: "JohnDoe1234@gmail.com",
  dialCode: "+90",
  cellphoneNumber: 1234567890,
  gender: "male",
  birthDate: "10.10.1980",
}

router.get("/accountInformation", (req, res) => {
  res.json({ accountInformation })
})

router.post("/accountInformation/dialCode", (req, res) => {
  const newDialCode = req.body.selectedDialCode

  accountInformation.dialCode = newDialCode

  res.json({ accountInformation })
})

router.post("/accountInformation/update", (req, res) => {
  const updatedName = req.body.updateName
  const updatedSurname = req.body.updateSurname
  const updatedEmail = req.body.updateEmail

  accountInformation.name = updatedName
  accountInformation.surname = updatedSurname
  accountInformation.email = updatedEmail

  res.json({ accountInformation })
})

module.exports = router
