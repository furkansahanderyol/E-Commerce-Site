import React, { useState } from "react"
import AccountInformation from "@/components/MyAccountPageComponents/AccountInformation/AccountInformation"
import AddressInformation from "@/components/MyAccountPageComponents/AddressInformation/AddressInformation"
import axios from "axios"
import styles from "../../styles/myAccountPageStyles/myAccount.module.css"

export default function index({ accountData }) {
  const [data, setData] = useState(accountData)
  const [section, setSection] = useState("info")

  function handleSectionClick(section) {
    return () => {
      setSection(section)
    }
  }

  return (
    <div className={styles.my_account_wrapper}>
      <div className={styles.section_container}>
        <div className={styles.my_account_headers}>
          <div
            onClick={handleSectionClick("info")}
            className={styles.section_header}
          >
            Info
          </div>
          <div
            onClick={handleSectionClick("address")}
            className={styles.section_header}
          >
            Addresses
          </div>
          <div
            onClick={handleSectionClick("order")}
            className={styles.section_header}
          >
            Orders
          </div>
        </div>
        {section === "info" ? (
          <div className={`${styles.section} ${styles.account}`}>
            <AccountInformation
              data={data.accountInformation}
              setData={setData}
            />
          </div>
        ) : null}
        {section === "address" ? (
          <div className={`${styles.section} ${styles.address}`}>
            <AddressInformation />
          </div>
        ) : null}
        {section === "order" ? (
          <div className={`${styles.section} ${styles.orders}`}>Orders</div>
        ) : null}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const accountInformationResponse = await axios.get(
    "http://localhost:3000/api/accountInformation"
  )
  const accountInformationData = await accountInformationResponse.data

  return {
    props: {
      accountData: accountInformationData,
    },
  }
}
