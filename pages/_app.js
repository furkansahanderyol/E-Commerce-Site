import Header from "@/components/CommonComponents/Header/Header"
import CollectionsProvider from "./collections/CollectionsContext"
import AddressFormProvider from "@/components/CommonComponents/AddressFormContext/AddressFormContext"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <CollectionsProvider>
      <AddressFormProvider>
        <Header />
        <Component {...pageProps} />
      </AddressFormProvider>
    </CollectionsProvider>
  )
}
