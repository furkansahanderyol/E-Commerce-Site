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
  const selectedItems = req.body
  const collectionId = req.query.id
  const updateItems = req.body.updateItems

  const newCollection = {
    id: uuid.v4(),
    collectionName: collectionName,
    items: selectedItems ? selectedItems : [],
  }

  if (collectionId) {
    let newItems = collections.map((collection) => {
      if (collection.id === collectionId) {
        return updateItems.map((item) => {
          return item
        })
      }
    })

    collections.forEach((collection) => {
      if (collection.id === collectionId && newItems) {
        collection.items.selectedItems.push(
          ...newItems.filter((item) => item != undefined)[0]
        )
      } else {
        return collection
      }
    })

    newItems = []
    res.json({ collections: collections })
  } else {
    collections.push(newCollection)
    res.json({ collections: collections })
  }
})

router.delete("/collections", (req, res) => {
  const collectionId = req.query.id

  const updatedCollection = collections.filter((collection) => {
    return collectionId !== collection.id
  })

  collections = updatedCollection

  res.json({ collections: collections })
})

module.exports = router
