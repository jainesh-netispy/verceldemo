import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import ManageService from 'src/views/ManageService'

const ManageServicePage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <ManageService />
    </div>
  )
}
export default ManageServicePage
