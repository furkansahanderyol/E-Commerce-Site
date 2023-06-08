import React, { useState, useRef, useContext, useEffect } from "react"
import ProductImage from "@/components/ProductImage/ProductImage"
import Stars from "@/components/Stars/Stars"
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton"
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton"
import { FaBookmark } from "react-icons/fa"
import { OverlayContext } from "@/components/OverlayContext/OverlayContext"
import CollectionListItem from "@/components/CollectionListItem/CollectionListItem"
import { AiOutlineClose } from "react-icons/ai"
import CreateNewCollectionModal from "@/components/CreateNewCollectionModal/CreateNewCollectionModal"
import { CollectionsContext } from "@/pages/collections/CollectionsContext"
import axios from "axios"
import styles from "../../../../styles/ProductPage.module.css"

export default function Product({ product = [], favorites, collections }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [productImage, setProductImage] = useState(0)
  const [imageZoom, setImageZoom] = useState(false)
  const [zoomedImageStyles, setZoomedImageStyles] = useState({
    backgroundImage: "",
    backgroundPosition: "",
    left: "",
    top: "",
  })
  const [newCollectionModal, setNewCollectionModal] = useState(false)
  const [collectionsData, setCollectionsData] = useState(collections)
  const zoomedImageRef = useRef(null)
  const productImages = product.images
  const isFavorite = favorites.favorites.some((fav) => {
    return fav.product.id === product.id
  })

  const {
    setOverlay,
    collectionList,
    setCollectionList,
    setCreateCollectionModal,
    isCollectionListUpdated,
    setIsCollectionListUpdated,
  } = useContext(OverlayContext)

  const { setIsNewCollection, setSelectFromFavorites, setCollectionName } =
    useContext(CollectionsContext)

  function addToCollection() {
    setCollectionList(true)
    setOverlay(true)
  }

  function handleCloseCollectionList() {
    setCollectionList(false)
    setOverlay(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/collections")
      const updatedData = await response.data
      setCollectionsData(updatedData)
      setIsCollectionListUpdated(false)
    }

    fetchData()
  }, [isCollectionListUpdated])

  return (
    <>
      <div className={styles.product_page_wrapper}>
        <div className={styles.product_info_wrapper}>
          <div className={styles.product_images_container}>
            <div className={styles.product_images}>
              <ProductImage
                image={productImages[productImage]}
                mini={false}
                productImage={productImage}
                setProductImage={setProductImage}
                totalImageCount={productImages.length}
                setImageZoom={setImageZoom}
                mousePosition={mousePosition}
                setMousePosition={setMousePosition}
                zoomedImageRef={zoomedImageRef}
                zoomedImageStyles={zoomedImageStyles}
                setZoomedImageStyles={setZoomedImageStyles}
              />
            </div>
            <div className={styles.product_mini_images}>
              {productImages.map((image, index) => {
                return (
                  <ProductImage
                    key={index}
                    index={index}
                    image={image}
                    mini={true}
                    productImage={productImage}
                    setProductImage={setProductImage}
                    totalImageCount={productImages.length}
                  />
                )
              })}
            </div>
          </div>
          <div
            ref={zoomedImageRef}
            className={
              imageZoom ? styles.zoomed_image : styles.zoomed_image_hidden
            }
            style={zoomedImageStyles}
          />
          <div
            className={
              imageZoom ? styles.product_info_hidden : styles.product_info
            }
          >
            <div className={styles.product_title}>{product.title}</div>
            <div className={styles.product_description}>
              {product.description}
            </div>
            <div className={styles.rating}>
              <div className={styles.stars}>
                <Stars rate={product.rating} />
              </div>
              <div className={styles.point}>{`(${product.rating})`}</div>
            </div>
            <div onClick={addToCollection} className={styles.add_to_collection}>
              <FaBookmark />
              <div>Add to collection</div>
            </div>
            <div className={styles.buttons_container}>
              <div className={styles.add_to_cart_button}>
                <AddToCartButton />
              </div>
              <div className={styles.add_to_favorites_button}>
                <FavoriteButton
                  square={true}
                  product={product}
                  isFavorite={isFavorite}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {collectionList ? (
        <div className={styles.collection_list}>
          <div className={styles.collection_list_header}>
            <div>Add to collection</div>
            <div onClick={handleCloseCollectionList}>
              <AiOutlineClose />
            </div>
          </div>
          <div className={styles.collection_list_container}>
            <CollectionListItem
              isDefault={true}
              setNewCollectionModal={setNewCollectionModal}
            />
            {collectionsData?.collections?.map((collection, index) => {
              return (
                <CollectionListItem
                  key={index}
                  collectionId={collection.id}
                  isDefault={false}
                  collectionName={collection.collectionName}
                  collectionImage={collection.items.selectedItems[0].images[0]}
                  product={product}
                />
              )
            })}
          </div>
        </div>
      ) : null}
      {newCollectionModal ? (
        <CreateNewCollectionModal
          isSpecific={true}
          product={product}
          setCollectionName={setCollectionName}
          setOverlay={setOverlay}
          setCreateCollectionModal={setCreateCollectionModal}
          setIsNewCollection={setIsNewCollection}
          setSelectFromFavorites={setSelectFromFavorites}
          setNewCollectionModal={setNewCollectionModal}
          setCollectionList={setCollectionList}
          setIsCollectionListUpdated={setIsCollectionListUpdated}
        />
      ) : null}
    </>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const product = params.product

  const productDetailsResponse = await fetch(
    `http://localhost:3000/api/products/${product}`
  )
  const favoriteProductsResponse = await fetch(
    "http://localhost:3000/api/favorites"
  )
  const collectionsResponse = await fetch(
    "http://localhost:3000/api/collections"
  )

  const productDetailsData = await productDetailsResponse.json()
  const favoriteProductsData = await favoriteProductsResponse.json()
  const collectionsData = await collectionsResponse.json()

  return {
    props: {
      product: productDetailsData.products[0],
      favorites: favoriteProductsData,
      collections: collectionsData,
    },
  }
}
