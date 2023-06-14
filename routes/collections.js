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

router.post("/collections/update", (req, res) => {
  const selectedCollectionId = req.body.selectedCollectionId
  const product = req.body.product

  collections.forEach((collection) => {
    if (collection.id === selectedCollectionId) {
      collection.items.selectedItems.push(product)
    }
  })

  res.json({ collections: collections })
})

router.post("/collections/transfer", (req, res) => {
  const selectedCollectionId = req.body.selectedCollectionId
  const currentCollectionId = req.body.currentCollectionId
  const product = req.body.product

  collections.forEach((collection) => {
    if (collection.id === currentCollectionId) {
      collection.items.selectedItems = collection.items.selectedItems.filter(
        (item) => {
          return item.id !== product.id
        }
      )
    }

    if (collection.id === selectedCollectionId) {
      collection.items.selectedItems.push(product)
    }
  })

  res.json({ collections: collections })
})

router.post("/collections/modify", (req, res) => {
  const currentCollectionId = req.body.collectionId
  const collectionName = req.body.collectionName
  const selectedProduct = req.body.selectedProduct

  let newCollection = {
    id: uuid.v4(),
    collectionName,
    items: { collectionName, selectedItems: [selectedProduct] },
  }

  collections.forEach((collection) => {
    if (collection.id === currentCollectionId) {
      const newItems = collection.items.selectedItems.filter((item) => {
        return item.id !== selectedProduct.id
      })

      collection.items.selectedItems = newItems
    }
  })

  collections.push(newCollection)
  newCollection = []

  res.json({ collections: collections })
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
