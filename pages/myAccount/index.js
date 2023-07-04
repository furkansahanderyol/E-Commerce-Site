import React, { useState } from "react"
import AccountInformation from "@/components/MyAccountPageComponents/AccountInformation/AccountInformation"
import MyAccountPageHeader from "@/components/MyAccountPageComponents/MyAccountpAgeHeader/MyAccountPageHeader"
import axios from "axios"
import styles from "../../styles/myAccountPageStyles/myAccount.module.css"

export default function index({ accountData }) {
  const [data, setData] = useState(accountData)

  return (
    <div className={styles.my_account_wrapper}>
      <div className={styles.section_container}>
        <MyAccountPageHeader section={"myAccount"} />
        <div className={`${styles.section} ${styles.account}`}>
          <AccountInformation
            data={data.accountInformation}
            setData={setData}
          />
        </div>
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
