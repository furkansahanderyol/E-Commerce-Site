const server = require("express")
const router = server.Router()

router.use(server.json())
router.use(server.urlencoded({ extended: false }))

let collections = []

router.get("/collections", (req, res) => {
  res.json({ collections: collections })
})

router.post("/collections", (req, res) => {
  const collectionName = req.body.collectionName
  const selectedItems = req.body.selectedItems

  const newCollection = {
    collectionName: collectionName,
    items: { selectedItems },
  }

  collections.push(newCollection)
})

module.exports = router
