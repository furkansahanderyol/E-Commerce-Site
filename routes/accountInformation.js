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
  const selectedDialCode = req.body

  accountInformation.dialCode = selectedDialCode

  res.json({ accountInformation })
})

router.post("/accountInformation/update", (req, res) => {
  const { updateName, updateSurname, updateEmail, updateGender } = req.body

  accountInformation.name = updateName
  accountInformation.surname = updateSurname
  accountInformation.email = updateEmail
  accountInformation.gender = updateGender

  res.json({ accountInformation })
})

module.exports = router
