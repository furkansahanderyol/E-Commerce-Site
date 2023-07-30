const express = require("express")
const next = require("next")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const url = require("url")

app.prepare().then(() => {
  const server = express()

  server.use((req, res, next) => {
    const parsedUrl = url.parse(req.url, true)
    const { pathname, query } = parsedUrl
    req.query = query

    return next()
  })

  const categoryRouter = require("./routes/category")
  server.use("/api/category", categoryRouter)

  const productsRouter = require("./routes/products")
  server.use("/api/products", productsRouter)

  const favoritesRouter = require("./routes/favorites")
  server.use("/api", favoritesRouter)

  const collectionsRouter = require("./routes/collections")
  server.use("/api", collectionsRouter)

  const cart = require("./routes/cart")
  server.use("/api", cart)

  const accountInformation = require("./routes/accountInformation")
  server.use("/api", accountInformation)

  const addressInformation = require("./routes/addressInformation")
  server.use("/api", addressInformation)

  const countryInformation = require("./routes/countryInformation")
  server.use("/api", countryInformation)

  const orders = require("./routes/orders")
  server.use("/api", orders)

  const allCategories = require("./routes/allCategories")
  server.use("/api", allCategories)

  const allProducts = require("./routes/allProducts")
  server.use("/api", allProducts)

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:3000")
  })
})
