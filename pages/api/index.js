export default async function handler(req, res) {
  const data = await fetch("https:dummyjson.com/products?limit=100")
  const response = await data.json()

  res.status(200).json({ products: response.products })
}
