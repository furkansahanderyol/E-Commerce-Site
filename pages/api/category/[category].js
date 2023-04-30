export default async function handler(req, res) {
  const data = await fetch("https:dummyjson.com/products?limit=100")
  const response = await data.json()

  const { category, brand } = req.query

  const categories = response.products
    .filter((product) => {
      return product.category === category
    })
    .filter((product) => {
      return product.brand === brand
    })

  res.status(200).json({ products: categories })
}
