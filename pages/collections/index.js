import React from "react"
import FavoritesHeader from "@/components/FavoritesHeader/FavoritesHeader"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import { FaPlus } from "react-icons/fa"
import styles from "../../styles/Collections.module.css"

export default function Collections({ collections }) {
  function handleCreateNewCollection() {
    console.log("hello")
  }

  return (
    <div className={styles.collections_wrapper}>
      <FavoritesHeader />
      <SectionHeader section={"collections"} />
      <div className={styles.create_new_collection_button}>
        <FaPlus />
        <div>Create new collection</div>
      </div>
      <div className={styles.collections}></div>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/collections")
  const data = await response.json()

  return {
    props: {
      collections: data.collections,
    },
  }
}
