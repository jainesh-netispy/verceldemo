import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import AddService from 'src/views/ManageService/AddService'

const AddServicePage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <AddService />
    </div>
  )
}
export default AddServicePage
