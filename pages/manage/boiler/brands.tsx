import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import ManageBoilerBrands from 'src/views/ManageBoilerBrands'

const ManageBoilerBrandsPage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <ManageBoilerBrands />
    </div>
  )
}
export default ManageBoilerBrandsPage
