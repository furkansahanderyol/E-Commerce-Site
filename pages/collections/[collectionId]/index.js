import React from "react"
import { useRouter } from "next/router"

export default function Collection() {
  const router = useRouter()
  const { collectionId } = router.query

  return <div>Hello there!</div>
}
