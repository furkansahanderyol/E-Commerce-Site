const express = require("express")
const axios = require("axios")
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

    // Add query parameters to the request object
    req.query = query

    return next()
  })

  server.get("/api/hello", (req, res) => {
    axios.get("https:dummyjson.com/products?limit=100").then((response) => {
      res.json(response.data)
    })
  })

  server.get("/api/bye", (req, res) => {
    axios.get("https:dummyjson.com/products?limit=100").then((response) => {
      const products = response.data.products
      const laptops = products.filter((product) => {
        return product.category === "motorcycle"
      })

      res.json(laptops)
    })
  })

  const useRouter = require("./routes/category")
  server.use("/api/category", useRouter)

  // handle all other requests
  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:3000")
  })
})
