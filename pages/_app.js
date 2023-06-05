import Header from "@/components/Header/Header"
import CollectionsProvider from "./collections/CollectionsContext"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <CollectionsProvider>
      <Header />
      <Component {...pageProps} />
    </CollectionsProvider>
  )
}
