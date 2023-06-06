import Header from "@/components/Header/Header"
import CollectionsProvider from "./collections/CollectionsContext"
import OverlayProvider from "@/components/OverlayContext/OverlayContext"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <OverlayProvider>
      <CollectionsProvider>
        <Header />
        <Component {...pageProps} />
      </CollectionsProvider>
    </OverlayProvider>
  )
}
