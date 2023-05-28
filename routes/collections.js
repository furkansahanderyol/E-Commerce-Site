const server = require("express")
const router = server.Router()
const uuid = require("uuid")

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
    id: uuid.v4(),
    collectionName: collectionName,
    items: selectedItems,
  }

  collections.push(newCollection)

  res.json({ collections: collections })
})

router.delete("/collections", (req, res) => {
  const collectionId = req.query.id

  const updatedCollection = collections.filter((collection) => {
    console.log(collection)
    return collectionId !== collection.id
  })

  collections = updatedCollection

  res.json({ collections: collections })
})

module.exports = router
