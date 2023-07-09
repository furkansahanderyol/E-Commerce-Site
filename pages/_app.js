import Header from "@/components/CommonComponents/Header/Header"
import CollectionsProvider from "./collections/CollectionsContext"
import OverlayProvider from "@/components/CommonComponents/OverlayContext/OverlayContext"
import AddressFormProvider from "@/components/CommonComponents/AddressFormContext/AddressFormContext"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <OverlayProvider>
      <CollectionsProvider>
        <AddressFormProvider>
          <Header />
          <Component {...pageProps} />
        </AddressFormProvider>
      </CollectionsProvider>
    </OverlayProvider>
  )
}
