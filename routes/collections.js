const server = require("express")
const router = server.Router()

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

let collections = []

router.get("/collections", (req, res) => {
  res.json({ collections: collections })
})

module.exports = router
